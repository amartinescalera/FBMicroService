'use strict';

module.exports = function(server, cfg) {
  const request = require('./request')(cfg);

  let routes = [
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
