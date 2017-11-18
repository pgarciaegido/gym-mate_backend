const Mongo = require('mongodb').MongoClient;
const Bcrypt = require('bcrypt');
const Boom = require('boom');
const { uri } = require('../../../config/db');

const saltRounds = 10;

const registerNewUser = (userData) => {
    return new Promise((resolve, reject) => {

        Mongo.connect(uri)
            .then((db) => {

                const collection = db.collection('users');

                collection.findOne({ email: userData.email })
                    .then((res) => {

                        if (res) {
                            return reject(Boom.conflict('Email already exists'));
                        }

                        Bcrypt.hash(userData.password, saltRounds)
                            .then((hash) => {

                                const newData = userData;
                                newData.password = hash;

                                collection.insert(userData)
                                    .then(() => resolve('Success inserting user'));
                            });
                    })
                    .catch(() => reject(Boom.serverUnavailable('Error with DB')));
            })
            .catch(err => reject(err));
    });
};

module.exports = {
    registerNewUser
};
