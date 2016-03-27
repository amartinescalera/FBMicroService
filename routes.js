'use strict';

module.exports = function(server, cfg) {

  const request = require('./request')(cfg);
  let routes = [

    // Add Users Operations 10
    /*{
     method: 'POST',
     path: '/user',
     config: {
     handler: function (req, reply) {
     r.user.create(req, reply);
     },
     validate: {
     payload: r.user.Schema
     }
     }
     },*/
    {
      method: 'GET',
      path: '/user/{token}/me',
      config: {
        handler: function(req, reply) {
          request.getMe(req.params.token, reply);
        }
      }
    },
    {
      method: 'GET',
      path: '/user/{token}/{userid}',
      config: {
        handler: function(req, reply) {
          request.getUser(req.params.token, req.params.userid, reply);
        }
      }
    }
  ];

  server.route(routes);
};
