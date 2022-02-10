const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const temp = {
  name: 'beautiful'
};

describe('Temperament routes', () => {
  before(() => conn.authenticate()
  .catch((done) => {
    console.error('Unable to connect to the database:', done);
  }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => (Temperament.create(temp))));
  describe('GET /api/temperament', () => {
    it('should get 200', () =>
      agent.get(('/api/temperament')).expect(200)
    );
  });
});
