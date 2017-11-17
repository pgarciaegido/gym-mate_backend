const jwt = require('jwt-simple');

const createJWToken = (payload, { password, _id }) => {
    return new Promise((resolve, reject) => {

        const secret = createJWTSecret(password, _id);
        const token = jwt.encode(payload, secret);

        resolve(token);
    });
};

const validateJWToken = ({ password, _id, email }, token) => {
    return new Promise((resolve, reject) => {

        const secret = createJWTSecret(password, _id);
        const decode = jwt.decode(token, secret);

        if (decode.email !== email) return reject(Boom.unauthorized('There was some problem with the token'));

        return resolve(decode);
    });
};

const createJWTSecret = (password, _id) => {
    return `${password}-${_id.toString()}`;
};

module.exports = { validateJWToken, createJWToken };