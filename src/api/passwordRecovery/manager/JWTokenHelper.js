/** @module PasswordRecovery/Manager/JWT */

const jwt = require('jwt-simple');
const Boom = require('boom');

/**
 * @description Creates a Jason Web Token.
 * @param {Object} payload Artificial payload. Here we use email. Example:
 * const pl = { email: res.email };
 * @param {Object}  userInfo In order to use password and _id to generate secret.
 * @return {Promise<token>} A promise with the token.
 */
const createJWToken = (payload, { password, _id }) => {
    return new Promise((resolve) => {

        const secret = createJWTSecret(password, _id);
        const token = jwt.encode(payload, secret);

        resolve(token);
    });
};

/**
 * @description Validates JW Token.
 * @param {Object} userInfo In order to use password and _id to generate secret.
 * @param {String} token JWT to be validated against user info.
 * @returns {Promise<valid>} Promise returning payload or error.
 */
const validateJWToken = ({ password, _id, email }, token) => {
    return new Promise((resolve, reject) => {

        const secret = createJWTSecret(password, _id);
        const decode = jwt.decode(token, secret);

        if (decode.email !== email) return reject(Boom.unauthorized('There was some problem with the token'));

        return resolve(decode);
    });
};

/**
 * @description Formats a JWT secret string
 * @param {String} password User password
 * @param {IdObject} _id User mongo _id
 * @returns {String} Secret formatted.
 */
const createJWTSecret = (password, _id) => {
    return `${password}-${_id.toString()}`;
};

module.exports = { validateJWToken, createJWToken };
