const express 		= require('express');
const bodyParser 	= require('body-parser');
const morgan			= require('morgan');
const cors				= require('cors');

const app					= express();

/* Middleware set up */
app.use(morgan('combined'));		// Logger
app.use(bodyParser.json());			// Easily parse request data
app.use(cors());								// Enable CORS (cross-origin resource sharing)

app.get('/status', (req, res) => {
	res.send({
		message: 'Hello world!'
	});
});

/* Server set up */
app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'));

console.log('Server listening on port ' + app.get('port'));

