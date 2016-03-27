'use strict';

var log = require('bunyan').createLogger({
  name: 'Facebook Micro Service'
});

var defs = {
  port: process.env.PORT || '3000',
  localhost: process.env.SERVER || '127.0.0.1',
  appSecret: process.env.APP_SECRET || 'aaa'
};

function getConfig(opts) {

  opts = opts || {};

  opts.port = opts.port || defs.port;
  opts.localhost = opts.localhost || defs.localhost;
  opts.appSecret = opts.appSecret || defs.appSecret;

  log.info('Config Option');
  log.info('Server:' + opts.localhost + ' Port:' + opts.port);

  return opts;
}

module.exports = {
  getConfig: getConfig
};
