const Models = require('../../models');
const md5 = require('md5');

async function recursiveInsert(longURL, shortURLHash, start, size) {
  const shortURL = shortURLHash.substr(start, size);
  const insertOp = await Models.URLPairs.findOrCreate({ where: { longURL, shortURL } });
  if ((insertOp[1] === true) ||
    (insertOp[1] === false && insertOp[0].dataValues.longURL === longURL)) {
    return insertOp[0].dataValues;
  }
  return recursiveInsert(longURL, shortURLHash, start + 1, size);
}

module.exports = [
  {
    method: 'POST',
    path: '/getShortUrl',
    handler: (request, response) => {
      const { payload: { longURL } } = request;
      const shortURLHash = md5(longURL);
      recursiveInsert(longURL, shortURLHash, 0, 6).then(res => response(res));
    },
  },
];
