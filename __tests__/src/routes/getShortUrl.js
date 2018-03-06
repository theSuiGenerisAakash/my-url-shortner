const Models = require('../../../models');
const Server = require('../../../src/server');

beforeEach(() => Models.URLPairs.destroy({ truncate: true }));
afterEach(() => Models.URLPairs.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing /getShortUrl', () => {
  it('Testing with a unique long URL', (done) => {
    const options = {
      method: 'POST',
      url: '/getShortUrl',
      payload: { longURL: 'http://google.co.in' },
    };
    Server.inject(options, (response) => {
      expect(response.result.longURL).toBe(options.payload.longURL);
      expect(response.result.longURL.length > 0).toBe(true);
      expect(typeof response.result.shortURL).toBe('string');
      done();
    });
  });
});
