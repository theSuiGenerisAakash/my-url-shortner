const handler = (request, reply) => {
  reply('Working!');
};

module.exports = {
  path: '/',
  method: 'GET',
  handler,
};
