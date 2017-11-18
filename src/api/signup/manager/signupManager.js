const { registerNewUser } = require('../dao/signupDao');

/**
 * @description Manager for signup proccess.
 * @param {Object} userData Data brought from the signup form.
 * @returns {Promise<inserted>} Promise with success or error message.
 */
const signupHandler = (userData) => {
    return new Promise((resolve, reject) => {

        registerNewUser(userData)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};

module.exports = {
    signupHandler
};
