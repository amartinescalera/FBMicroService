/**
 * Created by amartin on 14/12/2015.
 */
'use strict';

var log = require('bunyan').createLogger({
  name: 'Facebook Micro Service'
});

function respond(done, code, message) {
  if (code === 400 || code === 404) {
    message = {
      message: message
    };
  }
  log.info('Respond: ' + code + ' Message:' + message);
  done(null, message).code(code);
}

module.exports = respond;
