const Joi = require('joi');

const { askForPasswordRecoveryManager, allowChangePassword, setNewPasswordManager } = require('../manager/passwordRecoveryManager');

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
		allowChangePassword(request.params)
		.then(res => reply(res))
		.catch(err => reply(err));
	}
};

const changePasswordPost = {
	method: 'POST',
	path: '/introduce-new-password/{email}/{token}',
	config: {
		validate: {
			payload: {
				password: Joi.string().min(8).required()
			}
		},
		cors: true
	},
	handler(request, reply) {
		setNewPasswordManager(request.payload, request.params)
		.then(res => reply(res))
		.catch(err => reply(err));
	}
};

module.exports = { askForPasswordRecovery, changePasswordGet, changePasswordPost };
