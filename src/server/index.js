const Hapi = require('hapi');
const Mongo = require('mongodb').MongoClient;

const dbConfig = require('../config/db.js');

const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 5000
});

server.route({
	method: 'GET',
	path: '/hello',
	handler(req, res) {
		const toInsert = { name: 'Queipo', age: 25 };

		Mongo.connect(dbConfig.uri)
			.then((db) => {
				db.collection('ejemplo').insert(toInsert)
					.then((r) => {
						res('Hello!');
					});
			})
			.catch((err) => {
				console.log('llegamos al error');
				console.log(err);
			});
	}
});

server.start((err) => {
	if (err) {
		console.log('There has been an error');
	}

	console.log(`Server running at: ${server.info.uri}`);
});
