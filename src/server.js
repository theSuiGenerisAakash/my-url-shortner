const Hapi = require('hapi');
const Routes = require('./routes');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
  port: 8080,
  host: '0.0.0.0',
});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err;
  }
});

server.route(Routes);

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw (err);
    }
    console.log('Server started at port 8080');
  });
}

module.exports = server;
