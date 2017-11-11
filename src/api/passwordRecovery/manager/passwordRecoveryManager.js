const { emailExists } = require('../dao/passwordRecoveryDao');

const askForPasswordRecoveryManager = (payload) => {
    return new Promise((resolve, reject) => {
        emailExists(payload.email)
        .then((exists) => resolve(exists))
        .catch((err) => reject(err));
    })
};

module.exports = { askForPasswordRecoveryManager };
