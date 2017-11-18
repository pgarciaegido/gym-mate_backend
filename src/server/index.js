const Hapi = require('hapi');

const server = new Hapi.Server();

const { loginRouter } = require('../api/login/router/loginRouter');
const { signupRouter } = require('../api/signup/router/signupRouter');
const { askForPasswordRecovery, changePasswordGet, changePasswordPost } = require('../api/passwordRecovery/router/passwordRecoveryRouter');

// Register inert plugin
server.register(require('inert'));

// Connection
server.connection({
    host: 'localhost',
    port: 5000
});

// Serving static docs.
server.route({
    method: 'GET',
    path: '/documentation/{file*}',
    handler: {
        directory: {
            path: 'docs'
        }
    }
});

// Router
server.route(loginRouter);
server.route(signupRouter);
server.route(askForPasswordRecovery);
server.route(changePasswordGet);
server.route(changePasswordPost);

// Run
server.start((err) => {
    if (err) {
        console.log('There has been an error');
    }

    console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
