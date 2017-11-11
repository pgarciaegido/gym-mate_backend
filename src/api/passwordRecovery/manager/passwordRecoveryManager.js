const Boom = require('boom');
const { emailExists } = require('../dao/passwordRecoveryDao');
const { sendEmail } = require('./sendRecoveryPassEmail');

const askForPasswordRecoveryManager = (payload) => {
    return new Promise((resolve, reject) => {

        emailExists(payload.email)
        .then((name) => {
            if (!name) return reject(Boom.unauthorized('User does not exist'));
            
            sendEmail(payload.email, name)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch((err) => reject(err));
    })
};

module.exports = { askForPasswordRecoveryManager };
