/** @module PasswordRecovery/Dao */

const Mongo = require('mongodb').MongoClient;
const Boom = require('boom');
const Bcrypt = require('bcrypt');
const { uri } = require('../../../config/db');

const saltRounds = 10;

/**
 * @description Checks the existance of email in db.
 * @param {String} email User email
 * @return {Promise<userInfo>} Promise with user info or error.
 */
const emailExists = (email) => {
    return new Promise((resolve, reject) => {

        Mongo.connect(uri)
            .then((db) => {

                const collection = db.collection('users');

                collection.findOne({ email })
                    .then((res) => {
                        if (!res) return reject(Boom.unauthorized('User does not exist'));

                        return resolve(res);
                    });
            })
            .catch(() => Boom.serverUnavailable('There was a problem with server. Please try again.'));
    });
};

/**
 * @description Reset user password.
 * @param {String} newPassword New password
 * @param {String} email User email
 * @returns {Promise<inserted>} Promise with inserted object or error.
 */
const setNewPasswordDao = (newPassword, email) => {
    return new Promise((resolve) => {

        Mongo.connect(uri)
            .then((db) => {

                const collection = db.collection('users');

                Bcrypt.hash(newPassword, saltRounds)
                    .then((hash) => {

                        const insert = { password: hash };

                        collection.findOneAndUpdate({ email }, { $set: insert })
                            .then(res => resolve(res));
                    });
            })
            .catch(() => Boom.serverUnavailable('There was a problem with server. Please try again.'));
    });
};

module.exports = { emailExists, setNewPasswordDao };
