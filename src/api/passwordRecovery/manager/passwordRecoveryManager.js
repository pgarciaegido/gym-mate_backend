const Boom = require('boom');
const { emailExists, setNewPasswordDao } = require('../dao/passwordRecoveryDao');
const { sendEmail } = require('./sendRecoveryPassEmail');
const { validateJWToken, createJWToken } = require('./JWTokenHelper');

/**
 * @description Manager that allows user to change its password. Checks that email
 * exists, then creates a JWT and eventually sends an email where to reset.
 * @param {Object} payload Email provided by user who forgot its password.
 */
const askForPasswordRecoveryManager = ({ email }) => {
    return new Promise((resolve, reject) => {

        emailExists(email)
            .then((res) => {
                if (!res) return reject(Boom.unauthorized('User does not exist'));

                const pl = { email: res.email };
                createJWToken(pl, res)
                    .then((token) => {
                        sendEmail(email, res.name, token)
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
