'use strict';

const argh   		= require('argh');
const Hapi 			= require('hapi');
const config  		= require('./config');
const routes  		= require('./routes');
const MongoClient 	= require('mongodb').MongoClient;
const server 		= new Hapi.Server();

var log = require('bunyan').createLogger({
    name: 'Facebook Micro Service'
});

const opts = config.getConfig(argh.argv);

server.connection({
    host: opts.localhost,
    port: opts.port
});

if (opts.realMongoDB === true) {
    // Start the server
    MongoClient.connect(opts.mongo, function(err, db) {
        if (err) {
            log.info('Error running the database..', server.info.uri);
            throw err;
        } else {
            opts.mongo = db;
            routes(server, opts);
        }
    });
} else {
    var fakeDb = require('tingodb')(opts.tingoDb.config);
    opts.mongo = new fakeDb.Db(opts.tingoDb.path, {});
    routes(server, opts);
}

server.start((err) => {
    if (err) {
        log.info('Error running the Server...', server.info.uri);
        throw err;
    }
    log.info('Server running at:', server.info.uri);
});

module.exports = server;