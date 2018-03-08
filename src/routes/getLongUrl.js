const Models = require('../../models');
const redis = require('redis');

const client = redis.createClient();
module.exports = [
  {
    method: 'GET',
    path: '/getLongUrl/{shortURL}',
    handler: (request, response) => {
      const { params: { shortURL } } = request;
      client.hget('snipurl_cache', shortURL, (err, value) => {
        if (value === null) {
          Models.URLPairs.find({ where: { shortURL } }).then((res) => {
            if (res === null) {
              response({
                message: 'Aisa koi entry nai hai',
                statusCode: 204,
              });
            } else {
              client.hset('snipurl_cache', shortURL, res.dataValues.longURL);
              response({
                longURL: res.dataValues.longURL,
                statusCode: 201,
              });
            }
          });
        } else {
          response({
            longURL: value,
            statusCode: 200,
          });
        }
      });
    },
  },
];
