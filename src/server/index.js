const Hapi = require('hapi');

const dbConfig = require('../config/db.js');
const server = new Hapi.Server();

const { loginRouter } = require('../api/login/router/loginRouter');
const { signupRouter } = require('../api/signup/router/signupRouter');

// Connection
server.connection({
	host: 'localhost',
	port: 5000
});

// Routes
server.route(loginRouter);
server.route(signupRouter);

// Run
server.start((err) => {
	if (err) {
		console.log('There has been an error');
	}

	console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
