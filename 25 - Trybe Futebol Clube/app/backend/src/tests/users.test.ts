import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModel';
import { validLoginBody, invalidEmailLoginBody, invalidPasswordLoginBody, wrongPassUser } from './mocks/login.mock';
import Validations from '../middlewares/validations.middleware';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve validar os campos de e-mail e senha', async function () {
    const httpResponse = await chai.request(app).post('/login').send({});
    
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Deve validar com sucesso e retornar um token', async function () {
    const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.haveOwnProperty('token');
  });

  it('Deve negar acesso com um e-mail inválido', async function () {
    const response = await chai.request(app).post('/login').send(invalidEmailLoginBody);
    
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Deve negar acesso com uma senha inválida', async function () {
    const response = await chai.request(app).post('/login').send(invalidPasswordLoginBody);
    
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Deve negar acesso com senha errada do banco de dados', async function () {
    sinon.stub(User, 'findOne').resolves(wrongPassUser as any);
    sinon.stub(Validations, 'validateLogin').returns();
    
    const response = await chai.request(app).post('/login').send(validLoginBody);
    
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Deve retornar "Token não encontrado" para um login válido sem token', async function () {
    const httpResponse = await chai.request(app).get('/login/role');
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Token not found');
  });

  it('Deve retornar "Token deve ser um token válido" para um login válido com um token inválido', async function () {
    const httpResponse = await chai.request(app).get('/login/role').set('authorization', 'invalid token');
    
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body.message).to.be.equal('Token must be a valid token');
  });
});
