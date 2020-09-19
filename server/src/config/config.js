/* eslint-disable */
module.exports = {
	port: process.env.PORT || 8081,
	db: {
		database: process.env.DB_NAME || 'tab_tracker',
		user: process.env.DB_USER || 'tab_tracker',
		password: process.env.DB_PW || 'password',
		options: {
			dialect: process.env.DIALECT || 'sqlite',
			hot: process.env.HOST || 'localhost',
			storage: './tab_tracker.sqlite'
		}
	},
	authentication: {
		jwtSecret: process.env.JWT_SECRET || 'secret'
	}
}