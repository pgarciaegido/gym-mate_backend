const Mongo = require('mongodb').MongoClient;
const Bcrypt = require('bcrypt');
const Boom = require('boom');
const { uri } = require('../../../config/db');

const checkCredentialsDao = ({email, password}) => {
    return new Promise ((resolve, reject) => {

        Mongo.connect(uri)
        .then((db) => {
            const collection = db.collection('users');
    
            collection.findOne({email})
            .then((res) => {

                if (!res) {
                    return reject(Boom.unauthorized('User does not exist'));
                }

                Bcrypt.compare(password, res.password)
                .then(correct => {
                    if (correct) {
                        const { name, email } = res;
                        return resolve({name, email});
                    }

                    reject(Boom.unauthorized('Wrong password'));
                })
            });
        })
        .catch((err) => {
            reject(Boom.serverUnavailable(err));
        });
    });
}

module.exports = {
    checkCredentialsDao
}