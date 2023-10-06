import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { Matches, matchesInprogressTrue, matchesInprogressFalse, payload, updatedMatch, matchToCreate, matchCreated } from './mocks/match.mock';
import JWToken from '../utils/JWToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve retornar todas as correspondências - GET /matches', async function () {
    sinon.stub(Match, 'findAll').resolves(Matches as any);

    const response = await chai.request(app).get('/matches');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(Matches); 
  });

  it('Deve retornar todas as partidas em andamento - GET /matches?inProgress=true', async function () {
    sinon.stub(Match, 'findAll').resolves(matchesInprogressTrue as any);

    const response = await chai.request(app).get('/matches?inProgress=true');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesInprogressTrue);
  });

  it('Deve retornar todas as correspondências que não estão em andamento - GET /matches?inProgress=false', async function () {
    sinon.stub(Match, 'findAll').resolves(matchesInprogressFalse as any);

    const response = await chai.request(app).get('/matches?inProgress=false');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesInprogressFalse);
  });

  it('Deve atualizar o progresso da partida - PATCH /matches/:id/finish', async function () {
    sinon.stub(JWToken, 'verify').resolves(payload as any);
    sinon.stub(Match, 'update').resolves();

    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', 'Bearer token');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Deve atualizar uma correspondência - PATCH /matches/:id', async function () {
    sinon.stub(JWToken, 'verify').resolves(payload as any);
    sinon.stub(Match, 'update').resolves([1]);
  
    const response = await chai.request(app).patch('/matches/1').set('authorization', 'Bearer token');
  
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Updated' });
  });

  it('Deve criar uma correspondência - POST /matches', async function () {
    sinon.stub(JWToken, 'verify').resolves(payload as any);
    sinon.stub(Team, 'findByPk').resolves(true as any);
    sinon.stub(Match, 'create').resolves(matchCreated as any);

    const response = await chai.request(app).post('/matches').set('authorization', 'Bearer token').send(matchToCreate);
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(matchCreated);
  });
});
