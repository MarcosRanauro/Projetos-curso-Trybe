import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamModel';
import { allTeams, teamId } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Deve encontrar todas as equipes', async function () {
    sinon.stub(Team, 'findAll').resolves(allTeams as any);

    const response = await chai.request(app).get('/teams');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(allTeams);
  });

  it('Deve encontrar uma equipe por ID', async () => {
    sinon.stub(Team, "findByPk").resolves(teamId as any);
    const { status, body } = await chai.request(app).get(`/teams/${teamId.id}`);
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamId);
  });

  it('Deve tratar o erro ao encontrar uma equipe por ID', async function () {
    sinon.stub(Team, 'findByPk').resolves(null);

    const response = await chai.request(app).get(`/teams/${teamId.id}`);
    
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'Team not found' });
  });
});
