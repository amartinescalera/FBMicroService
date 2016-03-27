'use strict';

const argh  = require('argh');

var log   = require('bunyan').createLogger({
	name: 'Facebook Micro Service'
});

var defs = {
	port: process.env.PORT || '3000',
	localhost: process.env.SERVER || '127.0.0.1',
	app_secret: process.env.APP_SECRET || 'aaa',
	mongo: process.env.MONGO || 'mongodb://127.0.0.1:27017/trillDB',
	realMongoDB: ('true' === process.env.REAL) || false,
	tingoDb: {
		'path': './data',
		'config': {
			'nativeObjectID': true,
			'memStore': true
		}
	}
};

function getConfig(opts) {
	opts = opts || {};

	opts.port = opts.port || defs.port;
	opts.localhost = opts.localhost || defs.localhost;
	opts.app_secret = opts.app_secret || defs.app_secret;
	opts.mongo = opts.mongo || defs.mongo;
	opts.realMongoDB = opts.realMongoDB || defs.realMongoDB;
	opts.tingoDb = defs.tingoDb;

	log.info("Config Option");
	log.info("Server:" + opts.localhost + " Port:" + opts.port);
	if (opts.realMongoDB) {
		log.info("Using Real Database");
	} else {
		log.info("Using Fake Database");
	}

	return opts;
}

module.exports = {
	getConfig: getConfig
};