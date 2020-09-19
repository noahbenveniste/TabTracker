const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')); // Takes any function that uses a callback structure and creates a wrapper to use promise syntax

/* eslint-disable */
function hashPassword (user, options) {
	const SALT_FACTOR = 8;
	if (!user.changed('password')) {
		return;
	}
	return bcrypt
		.genSaltAsync(SALT_FACTOR)
		.then(salt => bcrypt.hashAsync(user.password, salt, null))
		.then(hash => {
			user.setDataValue('password', hash)
		});
}

module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('User', {
		email : {
			type : DataTypes.STRING,
			unique : true
		},
		password : DataTypes.STRING
	}, 
	{
		hooks: {
			beforeSave: hashPassword
		}
	});

	user.prototype.comparePassword = function (candidatePassword) {
		return bcrypt.compareAsync(candidatePassword, this.password);
	}

	return user;
}