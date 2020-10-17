var express = require('express'),
	app = express(),
	compress = require('compression'),
	morgan = require('morgan'),
	consolidate = require('consolidate'),
	path = require('path'),
	env = process.env.NODE_ENV || 'development';

// Add New Relic
require('newrelic');

app.locals.env = env;

// Set swig as the template engine
app.engine('server.view.html', consolidate['swig']);
app.set('view engine', 'server.view.html');
app.set('views', './server/views/');

// Add asset compresion
app.use(compress({
	filter: function(req, res) {
		return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
	},
	level: 9
}));

// Add logging
app.use(morgan('dev'));

// Send resources...
app.use(express.static('./client/public'));

// ...Or send app
app.get('*', function(req, res) {
	res.render('index');
});

// Start server.
app.listen(process.env.PORT || 3000, function () {
	console.log('\x1b[37m\x1b[40m!!!!!!!!!!!!!!!!!!!\x1b[0m');
});