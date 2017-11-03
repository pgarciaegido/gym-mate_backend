const { registerNewUser } = require('../dao/signupDao');

const signupHandler = (userData) => {
    return new Promise ((resolve, reject) => {

        registerNewUser(userData)
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
};

module.exports = {
    signupHandler
};
