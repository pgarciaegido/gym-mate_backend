const Mongo = require('mongodb').MongoClient;
const { uri } = require('../../../config/db');

const checkUserAndPassword = ({email, password}) => {
    return new Promise ((resolve, reject) => {

        Mongo.connect(uri)
        .then((db) => {
            const collection = db.collection('users');
    
            collection.findOne({email})
            .then((res) => {

                if (!res) {
                    return reject('USER_DOES_NOT_EXIST');
                }

                return resolve('Email is alright');
            });
        })
        .catch((err) => {
            reject(err);
        });
    });
}

module.exports = {
    checkUserAndPassword
}