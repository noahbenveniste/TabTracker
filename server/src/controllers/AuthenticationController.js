const {User} 	= require('../models');
const jwt 		= require('jsonwebtoken');
const config 	= require('../config/config');

function jwtSignUser (user) {
	const ONE_WEEK = 3600 * 24 * 7; // Seconds in a week
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	});
}

module.exports = {
	async register (req, res) {
		try {
			const user = await User.create(req.body);
			const userJson = user.toJSON();
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			});
		} catch (err) {
			console.log(err);
			res.status(400).send({
				error: 'Email already in use'
			})
		}
	},
	async login (req, res) {
		try {
			const {email,password} = req.body;
			const user = await User.findOne({
				where: {
					email: email
				}
			});

			if (!user) {
				return res.status(403).send({
					error: "Bad email"
				});
			}

			const isPasswordValid = await user.comparePassword(password);

			if (!isPasswordValid) {
				return res.status(403).send({
					error: "Bad password"
				});
			}

			const userJson = user.toJSON();

			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			});

		} catch (err) {
			res.status(500).send({
				error: "A server error has occurred while trying to log in"
			});
		}
	}
}