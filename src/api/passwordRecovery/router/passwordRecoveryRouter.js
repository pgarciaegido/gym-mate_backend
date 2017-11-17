const Joi = require('joi');

const { askForPasswordRecoveryManager, validateJWTToken } = require('../manager/passwordRecoveryManager');

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

const changePasswordGet = {
	method: 'GET',
	path: '/introduce-new-password/{email}/{token}',
	config: {
		cors: true
	},
	handler(request, reply) {
		validateJWTToken(request.params)
		.then(res => reply(res))
		.catch(err => reply(err));
	}
};

const changePasswordPost = {
	method: 'POST',
	path: '/introduce-new-password',
	config: {
		validate: {
			payload: {
				email: Joi.string().min(8).required()
			}
		},
		cors: true
	},
	handler(request, reply) {
		
	}
};

module.exports = { askForPasswordRecovery, changePasswordGet, changePasswordPost };
