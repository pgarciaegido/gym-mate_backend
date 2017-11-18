const Joi = require('joi');

const { signupHandler } = require('../manager/signupManager');

const signupRouter = {
    method: 'POST',
    path: '/signup',
    config: {
        validate: {
            payload: {
                name: Joi.string().max(20).required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).required()
            }
        },
        cors: true
    },
    handler(request, reply) {
        signupHandler(request.payload)
            .then(res => reply(res))
            .catch(err => reply(err));
    }
};

module.exports = {
    signupRouter
};
