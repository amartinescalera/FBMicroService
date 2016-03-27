/**
 * Created by amartin on 14/12/2015.
 */
'use strict';

function respond(done, code, message) {
  if (code === 400 || code === 404) {
    message = {
      message: message
    };
  }
  done(null, message).code(code);
}

module.exports = respond;
