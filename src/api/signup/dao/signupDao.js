/** @module Signup/Dao */

const Mongo = require('mongodb').MongoClient;
const Bcrypt = require('bcrypt');
const Boom = require('boom');
const { uri } = require('../../../config/db');

const saltRounds = 10;

/**
 * @description Registers new user in db. First checks that user email does not exists, then hash
 * password and eventually inserts it.
 * @memberof module:Signup
 * @param {Object} userData User data brought from the form.
 * @returns {Promise<inserted>} Promise with success or error message.
 */
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

                                collection.insert(newData)
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
