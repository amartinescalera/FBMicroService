'use strict';
const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const server = new Hapi.Server();

var log = require('bunyan').createLogger({
  name: 'Facebook Micro Service'
});

const opts = config.getConfig();

server.connection({
  host: opts.localhost,
  port: opts.port
});

routes(server, opts);

server.start((err) => {
  if (err) {
    log.info('Error running the Server...', server.info.uri);
    throw err;
  }
  log.info('Server running at:', server.info.uri);
});

module.exports = server;
