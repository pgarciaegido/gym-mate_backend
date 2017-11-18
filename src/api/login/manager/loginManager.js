const { checkCredentialsDao } = require('../dao/loginDao');

/**
 * @description Manager to login service.
 * @param {Object} credentials User to be logged in credentials.
 * @returns {Promise<userInfo>} Promise with user info or error.
 */
const checkCredentialsManager = (credentials) => {
    return new Promise((resolve, reject) => {

        checkCredentialsDao(credentials)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};

module.exports = {
    checkCredentialsManager
};
