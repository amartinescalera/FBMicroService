'use strict';

const crypto = require('crypto');
const request = require('request');
const respond = require('./respond');
const url = "https://graph.facebook.com/";
const version = "v2.4/";
const personalData = "?fields=id,name,friends";
const appSecret = "&appsecret_proof=";

module.exports = function(cfg) {

    var _getSecretKey = function (appsecret_proof, token) {
        return crypto.createHmac('sha256', appsecret_proof).update(token).digest('hex');
    };

    let getUser = function(token, done) {

        let hash = _getSecretKey(cfg.app_secret, token);

        let options = {
            url: url + version + "me" + personalData + appSecret + hash,
            headers: {
                'Authorization': 'OAuth ' + token,
                'Content-Type':'application/json'
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
        getUser: getUser
    };
};