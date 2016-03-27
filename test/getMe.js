'use strict';

const Code 		= require('code');
const Lab 		= require("lab");
const lab 		= exports.lab = Lab.script();
const faker 	= require("faker");
const nock	 	= require("nock");
const request 	= require('request');
const server 	= require("../server");
const it		= lab.it;
const describe 	= lab.experiment;

let scope;

describe('Get User Test', function() {
	it ("Get a User",(done) => {

		let res = {
			"id": faker.random.number(),
			"name": "Antonio Martin",
			"birthday": "07/16/1980",
			"email": "antoniomeh@antoniomeh.info",
			"first_name": "Antonio"
		};

		scope = nock('https://graph.facebook.com',{
			reqheaders: {
				'Authorization': 'OAuth CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy',
				'Content-Type':'application/json'
			}
		})
		.get('/v2.4/me?fields=id,name,friends&appsecret_proof=5d124ca0c528a34b1d9da05e738cd11736ab9f9b3cd3c6a9b10a279c91ecd472')
		.reply(200, res);

		let options = {
			method: "GET",
			url: "/user/CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy/me"
		};

		// server.inject lets you similate an http request
		server.inject(options, function(response) {
			Code.expect(response.statusCode).to.equals(200);
			var obj = JSON.parse(response.payload);
			Code.expect(obj.id).to.equals(res.id);
			Code.expect(obj.name).to.equals(res.name);
			Code.expect(obj.birthday).to.equals(res.birthday);
			Code.expect(obj.email).to.equals(res.email);
			Code.expect(obj.first_name).to.equals(res.first_name);
			done();
		});
	});

	it ("Get a error with an user",(done) => {

		let res = {
			"error": {
				"message": "Error validating access token: Session does not match current stored session. This may be because the user changed the password since the time the session was created or Facebook has changed the session for security reasons.",
				"type": "OAuthException",
				"code": 190,
				"error_subcode": 460,
				"fbtrace_id": "C10orPiKq2m"
			}
		};

		scope = nock('https://graph.facebook.com',{
			reqheaders: {
				'Authorization': 'OAuth CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy',
				'Content-Type':'application/json'
			}
		})
			.get('/v2.4/me?fields=id,name,friends&appsecret_proof=5d124ca0c528a34b1d9da05e738cd11736ab9f9b3cd3c6a9b10a279c91ecd472')
			.reply(401, res);

		let options = {
			method: "GET",
			url: "/user/CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy/me"
		};

		// server.inject lets you similate an http request
		server.inject(options, function(response) {
			console.log(JSON.stringify(response.statusCode));
			Code.expect(response.statusCode).to.equals(401);
			var obj = JSON.parse(response.payload);
			Code.expect(obj.error.message).to.equals(res.error.message);
			Code.expect(obj.error.type).to.equals(res.error.type);
			Code.expect(obj.error.code).to.equals(res.error.code);
			Code.expect(obj.error.error_subcode).to.equals(res.error.error_subcode);
			Code.expect(obj.error.fbtrace_id).to.equals(res.error.fbtrace_id);
			done();
		});
	});

	it ("Get an unknowerror",(done) => {

		scope = nock('https://graph.facebook.com',{
			reqheaders: {
				'Authorization': 'OAuth CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy',
				'Content-Type':'application/json'
			}
		})
			.get('/v2.4/me?fields=id,name,friends&appsecret_proof=5d124ca0c528a34b1d9da05e738cd11736ab9f9b3cd3c6a9b10a279c91ecd472')
			.reply(500, null);

		let options = {
			method: "GET",
			url: "/user/CAAJp5SmLmN8BAFAi6ZBCSH51RDDqhsqJH4z6uzYU4Unk3U45tjQrLw29g6ZBqB8FbNXGVPi70wKtHsBsiy/me"
		};

		// server.inject lets you similate an http request
		server.inject(options, function(response) {
			console.log(JSON.stringify(response.statusCode));
			Code.expect(response.statusCode).to.equals(400);
			done();
		});
	});

});
