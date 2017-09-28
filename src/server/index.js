const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 5000
});

server.route({
	method: 'GET',
	path: '/hello',
	handler(req, res) {
		return res('Hello!!');
	}
});

server.start((err) => {
	if (err) {
		console.log('There has been an error');
	}

	console.log(`Server running at: ${server.info.uri}`);
});
