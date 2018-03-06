const Models = require('../../models');

module.exports = [
  {
    method: 'POST',
    path: '/getLongUrl',
    handler: (request, response) => {
      const { payload: { shortURL } } = request;
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
