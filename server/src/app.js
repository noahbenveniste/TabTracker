/* eslint-disable */
const express 		= require('express');
const bodyParser 	= require('body-parser');
const morgan			= require('morgan');
const cors				= require('cors');
const {sequelize} = require('./models');
const config 			= require('./config/config');

const app					= express();

/* Middleware set up */
app.use(morgan('combined'));		// Logger
app.use(bodyParser.json());			// Easily parse request data
app.use(cors());								// Enable CORS (cross-origin resource sharing)

require('./routes')(app);

sequelize.sync({force:true}) // To clear DB, add argument {force:true}
	.then( () => {

		/* Server set up */
		app.listen(config.port);

		console.log(`Server listening on port ${config.port}`);
	});



