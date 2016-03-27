'use strict';

const appSecret = '&appsecret_proof=';
const crypto = require('crypto');
const personalData = '?fields=id,name,friends,picture';
const request = require('request');
const respond = require('./respond');
const url = 'https://graph.facebook.com/';
const version = 'v2.4/';

var log = require('bunyan').createLogger({
  name: 'Facebook Micro Service'
});

module.exports = function(cfg) {

  let _getSecretKey = function(appsecretProof, token) {
    return crypto.createHmac('sha256', appsecretProof).update(token)
                                                      .digest('hex');
  };

  let getUser = function(token, userId, done) {

    log.info('[ GET USER ] token:' + token + ' userId:' + userId);

    let hash = _getSecretKey(cfg.appSecret, token);

    log.info('[ GET ME ] hash:' + hash);

    let options = {
      url: url + version + userId + personalData + appSecret + hash,
      headers: {
        'Authorization': 'OAuth ' + token,
        'Content-Type': 'application/json'
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        respond(done, 200, body);
      } else if (!error && response.statusCode == 401) {
        respond(done, 401, body);
      } else {
        respond(done, 400, null);
      }
    });
  };

  let getMe = function(token, done) {

    log.info('[ GET ME ] token:' + token);

    let hash = _getSecretKey(cfg.appSecret, token);

    log.info('[ GET ME ] hash:' + hash);

    let options = {
      url: url + version + 'me' + personalData + appSecret + hash,
      headers: {
        'Authorization': 'OAuth ' + token,
        'Content-Type': 'application/json'
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        respond(done, 200, body);
      } else if (!error && response.statusCode == 401) {
        respond(done, 401, body);
      } else {
        respond(done, 400, null);
      }
    });
  };

  return {
    getMe: getMe,
    getUser: getUser
  };
};
