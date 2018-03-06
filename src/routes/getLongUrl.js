const Models = require('../../models');

module.exports = [
  {
    method: 'GET',
    path: '/getLongUrl/{shortURL}',
    handler: (request, response) => {
      const { params: { shortURL } } = request;
      return Models.URLPairs.find({ where: { shortURL } }).then((res) => {
        if (res === null) {
          response({
            message: 'Aisa koi entry nai hai',
            statusCode: 204,
          });
        } else {
          response(res);
        }
      });
    },
  },
];
