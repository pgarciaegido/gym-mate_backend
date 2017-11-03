const Joi = require('joi');

const { checkCredentialsManager } = require('../dao/loginDao');

const loginRouter = {
	method: 'POST',
	path: '/login',
	config: {
		validate: {
			payload: {
				email: Joi.string().email().required(),
				password: Joi.string().min(8).required()
			}
		}
	},
	handler(request, reply) {
		checkCredentialsManager(request.payload)
		.then(res => {
			reply(res);
		})
		.catch(err => {
			reply(err);
		});
	}
};

module.exports = { loginRouter };
