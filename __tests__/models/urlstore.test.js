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

describe('Testing length validation of shortUrl', () => {
  it('Testing shortURL of length 7', (done) => {
    Models.URLPairs.create({ longURL: 'www.example.com', shortURL: 'abcdefg' })
      .catch((err) => { expect(err).not.toBe(null); done(); });
  });
  it('Testing shortURL of length 5', (done) => {
    Models.URLPairs.create({ longURL: 'www.example.com', shortURL: 'abcde' })
      .catch((err) => { expect(err).not.toBe(null); done(); });
  });
  it('Testing shortURL of length 6', (done) => {
    Models.URLPairs.create({ longURL: 'www.example.com', shortURL: 'abcdef' })
      .then((value) => {
        expect(value.dataValues).not.toBe(null);
        done();
      });
  });
});

describe('Testing unique constraint validation in the model', () => {
  it('Testing for new url, should insert successfully', (done) => {
    Models.URLPairs.create({ longURL: 'www.example12345.com', shortURL: 'c71a30' })
      .then((value) => { expect(value.dataValues).not.toBe(null); done(); });
  });

  it('Testing for repeated url, should not insert', (done) => {
    Models.URLPairs.create({ longURL: 'www.example12.com', shortURL: 'qwerty' }).then(() => {
      Models.URLPairs.create({ longURL: 'www.example12.com', shortURL: 'qwerty' })
        .catch((err) => { expect(err).not.toBe(null); done(); });
    });
  });
});
