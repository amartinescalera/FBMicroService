'use strict';

const crypto = require('crypto');
const request = require('request');
const respond = require('./respond');
const url = 'https://graph.facebook.com/';
const version = 'v2.4/';
const personalData = '?fields=id,name,friends,picture';
const appSecret = '&appsecret_proof=';

module.exports = function(cfg) {

  var _getSecretKey = function(appsecretProof, token) {
    return crypto.createHmac('sha256', appsecretProof).update(token)
                                                      .digest('hex');
  };

  let getUser = function(token, userId, done) {

    let hash = _getSecretKey(cfg.appSecret, token);

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

    let hash = _getSecretKey(cfg.appSecret, token);

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
