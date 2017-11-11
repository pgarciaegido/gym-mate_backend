const Joi = require('joi');

const { checkCredentialsManager } = require('../manager/loginManager');

const loginRouter = {
	method: 'POST',
	path: '/login',
	config: {
		validate: {
			payload: {
				email: Joi.string().email().required(),
				password: Joi.string().min(8).required()
			}
		},
		cors: true
	},
	handler(request, reply) {
		checkCredentialsManager(request.payload)
		.then(res => reply(res) )
		.catch(err => reply(err).code(400) );
	}
};

module.exports = { loginRouter };
