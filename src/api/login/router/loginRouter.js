const Joi = require('joi');

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
		console.log('hola');
		reply('works');
	}
};

module.exports = { loginRouter };
