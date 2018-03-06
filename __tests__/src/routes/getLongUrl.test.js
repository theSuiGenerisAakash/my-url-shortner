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
      method: 'POST',
      url: '/getLongUrl',
      payload: {},
    };
    Server.inject(optionsForSeedingShortURL, (responseAfterSeed) => {
      Server.inject({
        ...optionsForFetchingLongURL,
        payload: { shortURL: responseAfterSeed.result.shortURL },
      }, (responseAfterFetch) => {
        console.log(responseAfterFetch.result);
        Models.URLPairs.findAll({
          where: {
            shortURL: responseAfterFetch.result.shortURL,
            longURL: responseAfterFetch.result.longURL,
          },
        })
          .then((responseDB) => {
            expect(responseDB.length).toBe(1);
            done();
          });
      });
    });
  });
});
