const Mongo = require('mongodb').MongoClient;
const Boom = require('boom');
const { uri } = require('../../../config/db');

const emailExists = (email) => {
    console.log(email.email);
    return new Promise ((resolve, reject) => {

        Mongo.connect(uri)
        .then((db) => {

            const collection = db.collection('users');

            collection.findOne({ email: email.email })
            .then(res => {
                if (!res) return reject(Boom.unauthorized('User does not exist'));

                return resolve(true);
            })
        })
        .catch((err) => Boom.serverUnavailable('There was a problem with server. Please try again.'));
    });
}

module.exports = { emailExists };