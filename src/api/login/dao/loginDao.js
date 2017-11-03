const Mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const { uri } = require('../../../config/db');

const checkCredentialsDao = ({email, password}) => {
    return new Promise ((resolve, reject) => {

        Mongo.connect(uri)
        .then((db) => {
            const collection = db.collection('users');
    
            collection.findOne({email})
            .then((res) => {

                if (!res) {
                    return reject('USER_DOES_NOT_EXIST');
                }

                bcrypt.compare(password, res.password)
                .then(res => {
                    if (res) {
                        return resolve('SUCCESSFUL_LOGIN');
                    }

                    reject('WRONG_PASSWORD');
                })
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    checkCredentialsDao
}