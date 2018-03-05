const Models = require('../../models');

beforeEach(() => Models.URLPairs.destroy({ truncate: true }));
afterEach(() => Models.URLPairs.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing URLPairs table', () => {
  it('Testing table for columns', (done) => {
    const urlObj = {
      longURL: 'http://google.com',
      shortURL: 'adshv1',
    };
    Models.URLPairs.create(urlObj).then((res) => {
      expect(res.longURL).toBe(urlObj.longURL);
      expect(res.longURL).toBe(urlObj.longURL);
      done();
    }).catch(err => console.log(err));
  });
});
