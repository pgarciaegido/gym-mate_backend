const Hapi = require('hapi');

const server = new Hapi.Server();

const { loginRouter } = require('../api/login/router/loginRouter');
const { signupRouter } = require('../api/signup/router/signupRouter');
const { askForPasswordRecovery, changePasswordGet, changePasswordPost } = require('../api/passwordRecovery/router/passwordRecoveryRouter');

// Connection
server.connection({
    host: 'localhost',
    port: 5000
});

// Routes
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
