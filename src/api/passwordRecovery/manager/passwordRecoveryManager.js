const Boom = require('boom');
const jwt = require('jwt-simple');
const { emailExists } = require('../dao/passwordRecoveryDao');
const { sendEmail } = require('./sendRecoveryPassEmail');

const askForPasswordRecoveryManager = (payload) => {
    return new Promise((resolve, reject) => {

        emailExists(payload.email)
        .then((res) => {
            if (!res) return reject(Boom.unauthorized('User does not exist'));

            // Creates JWT. 
            const pl = { email: res.email };
            const secret = createJWTSecret(res.password, res._id);
            const token = jwt.encode(pl, secret);
            
            sendEmail(payload.email, res.name, token)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch((err) => reject(err));
    });
};

const validateJWTToken = ({email, token}) => {
    return new Promise((resolve, reject) => {

        emailExists(email)
        .then((res) => {
            if (!res) return reject(Boom.unauthorized('User does not exist'));

            // Decodes JWT.
            const secret = createJWTSecret(res.password, res._id);
            const decode = jwt.decode(token, secret);

            if (decode.email !== res.email) return reject(Boom.unauthorized('There was some problem with the token'));

            return resolve(decode);
        })
        .catch(err => reject(Boom.unauthorized(`There is been an error. ${err}`)));
    });
};

const createJWTSecret = (password, _id) => {
    return `${password}-${_id.toString()}`;
}

module.exports = { askForPasswordRecoveryManager, validateJWTToken };
