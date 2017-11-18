const Boom = require('boom');
const { emailExists, setNewPasswordDao } = require('../dao/passwordRecoveryDao');
const { sendEmail } = require('./sendRecoveryPassEmail');
const { validateJWToken, createJWToken } = require('./JWTokenHelper');

const askForPasswordRecoveryManager = (payload) => {
    return new Promise((resolve, reject) => {

        emailExists(payload.email)
            .then((res) => {
                if (!res) return reject(Boom.unauthorized('User does not exist'));

                const pl = { email: res.email };
                createJWToken(pl, res)
                    .then((token) => {
                        sendEmail(payload.email, res.name, token)
                            .then(rs => resolve(rs))
                            .catch(err => reject(err));
                    });
            })
            .catch(err => reject(err));
    });
};

const allowChangePassword = ({ email, token }) => {
    return new Promise((resolve, reject) => {

        emailExists(email)
            .then((res) => {
                if (!res) return reject(Boom.unauthorized('User does not exist'));

                validateJWToken(res, token)
                    .then(() => resolve('OK'))
                    .catch(() => reject(Boom.unauthorized('Invalid token')));
            })
            .catch(err => reject(Boom.unauthorized(`There is been an error. ${err}`)));
    });
};

const setNewPasswordManager = ({ password }, { email, token }) => {
    return new Promise((resolve, reject) => {

        emailExists(email)
            .then((res) => {

                // Validates with old password
                validateJWToken(res, token)
                    .then(() => {

                        setNewPasswordDao(password, email)
                            .then(rs => resolve(rs));
                    })
                    .catch(err => reject(Boom.unauthorized(`Error with JWT : ${err}`)));
            })
            .catch(err => reject(Boom.unauthorized(`Error setting new password: ${err}`)));
    });
};

module.exports = { askForPasswordRecoveryManager, allowChangePassword, setNewPasswordManager };
