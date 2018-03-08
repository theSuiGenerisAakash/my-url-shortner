const Models = require('../../../models');
const Server = require('../../../src/server');

beforeEach(done => Models.URLPairs.destroy({ truncate: true }).then(() => { done(); }));
afterEach(done => Models.URLPairs.destroy({ truncate: true }).then(() => { done(); }));
afterAll(() => Models.close());

describe('Testing /getLongUrl', () => {
  it('Testing with a short URL for its uniqueness', (done) => {
    const optionsForSeedingShortURL = {
      method: 'POST',
      url: '/getShortUrl',
      payload: { longURL: 'http://google.co.in' },
    };
    const optionsForFetchingLongURL = {
      method: 'GET',
      url: '/getLongUrl',
    };
    Server.inject(optionsForSeedingShortURL, (responseAfterSeed) => {
      Server.inject({
        ...optionsForFetchingLongURL,
        url: `/getLongUrl/${responseAfterSeed.result.shortURL}`,
      }, (responseAfterFetch) => {
        console.log(responseAfterFetch.result);
        expect(responseAfterFetch.result.longURL).toBe(optionsForSeedingShortURL.payload.longURL);
        done();
      });
    });
  });
  it('Testing with a short URL when its absent in the table', (done) => {
    const options = {
      method: 'GET',
      url: '/getLongUrl/nothin',
    };
    Server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(204);
      done();
    });
  });
});
