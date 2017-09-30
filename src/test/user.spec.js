/* eslint-env mocha */

const User = require('./user.js');
const { uri } = require('../config/db.js');

const { expect } = require('chai');
const Mongo = require('mongodb').MongoClient;


describe('User module', () => {
	describe('"up"', () => {
		it('should export a function', () => {
			expect(User.up).to.be.a('function');
		});

		it('should return a Promise', () => {
			const userUpResult = User.up();

			expect(userUpResult.then).to.be.a('Function');
			expect(userUpResult.catch).to.be.a('Function');
		});
	});
});
