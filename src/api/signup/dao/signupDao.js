const Mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const { uri } = require('../../../config/db');

const saltRounds = 10;

const registerNewUser = (userData) => {
    return new Promise((resolve, reject) => {

        Mongo.connect(uri)
        .then(db => {
            
            const collection = db.collection('users');
            
            collection.findOne({email: userData.email})
            .then(res => {

                if (res) {
                    return reject('EMAIL_ALREADY_EXISTS');
                }

                bcrypt.hash(userData.password, saltRounds)
                .then(hash => {

                    userData.password = hash;

                    collection.insert(userData)
                    .then(res => resolve('SUCCESS_INSERTING_USER'))
                })
            })
            .catch(err => reject('ERROR_WITH_DB'));
        })
        .catch(err => reject(err));
    });
}

module.exports = {
    registerNewUser
};