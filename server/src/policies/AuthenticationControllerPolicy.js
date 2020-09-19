const Joi = require('joi');

/* Password must be between 8 and 32 characters long, require at least one lowercase letter, at least one uppercase letter, at least one special character */
const passwordRegex = '^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$';

module.exports = {
	register (req, res, next) {
		const schema = Joi.object({
			email: Joi.string().email(),
			password: Joi.string().regex(
				new RegExp(passwordRegex)
			)
		})
		
		const {error} = schema.validate(req.body)

		if (error) {
			switch(error.details[0].context.key) {
				case 'email':
					res.status(400).send({
						error: 'Invalid email'
					});
					break;
				case 'password':
					res.status(400).send({
						error: `Invalid password
						<br>
						1. Must be between 8 and 32 characters long
						<br>
						2. Must have at least one lowercase letter, one uppercase letter, one digit and one special character !@#$%^&*
						<br>`
					});
					break;
				default:
					res.status(400).send({
						error: 'Invalid registration information'
					});
			}
		} else {
			next();
		}
	}
}