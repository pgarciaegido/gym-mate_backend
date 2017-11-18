const { checkCredentialsDao } = require('../dao/loginDao');

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
