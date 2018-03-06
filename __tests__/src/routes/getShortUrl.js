const Models = require('../../../models');
const Server = require('../../../src/server');

beforeEach(done => Models.URLPairs.destroy({ truncate: true }).then(() => { done(); }));
afterEach(done => Models.URLPairs.destroy({ truncate: true }).then(() => { done(); }));
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
      expect(response.result.shortURL.length > 0).toBe(true);
      expect(typeof response.result.shortURL).toBe('string');
      done();
    });
  });
  it('Testing with the same long URL twice', (done) => {
    const options = {
      method: 'POST',
      url: '/getShortUrl',
      payload: { longURL: 'http://google.co.in' },
    };
    Server.inject(options, (response) => {
      Server.inject(options, (response2) => {
        expect(response2.result.longURL).toBe(options.payload.longURL);
        expect(response2.result.shortURL.length > 0).toBe(true);
        expect(typeof response.result.shortURL).toBe('string');
        expect(response2.result.shortURL).toBe(response.result.shortURL);
        done();
      });
    });
  });
  it('Testing with the two long URLs producing same hash', (done) => {
    const options = {
      method: 'POST',
      url: '/getShortUrl',
      payload: { longURL: 'http://google.co.in' },
    };
    Server.inject(options, (response) => {
      Models.URLPairs.truncate().then(() =>
        Models.URLPairs.create({
          longURL: 'http://facebook.com', shortURL: response.result.shortURL, createdAt: new Date(), updatedAt: new Date(),
        })).then(() =>
        Server.inject(options, (response) => {
          expect(response.result.shortURL.length > 0).toBe(true);
          expect(typeof response.result.shortURL).toBe('string');
          expect(response.result.shortURL).not.toBe('bf382d');
          done();
        }));
    });
  });
});
