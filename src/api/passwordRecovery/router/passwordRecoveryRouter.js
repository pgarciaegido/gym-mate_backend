const Joi = require('joi');

const { askForPasswordRecoveryManager } = require('../manager/passwordRecoveryManager');

const askForPasswordRecovery = {
	method: 'POST',
	path: '/recover-password',
	config: {
		validate: {
			payload: {
				email: Joi.string().email().required()
			}
		},
		cors: true
	},
	handler(request, reply) {
		askForPasswordRecoveryManager(request.payload)
		.then(res => reply(res))
		.catch(err => reply(err));
	}
};

module.exports = { askForPasswordRecovery };