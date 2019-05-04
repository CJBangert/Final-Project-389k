var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var exphbs = require('express-handlebars');
var passport = require('passport');
var session = require('express-session');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));


// const MongoClient = require('mongodb').MongoClient
// const format = require('util').format
// const uri = "mongodb+srv://CJADMIN:encodeURIComponent('$oundPlowDB1')@cluster0-rx3qh.mongodb.net/test?retryWrites=true";
// MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
// 	if (err) {
// 		throw err;
// 	} else {
// 		console.log("Connected");
// 	}

// 	client.close()
// });

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(function(err, client) {
	assert.equal(null, err);
  	if (err) {
		throw err;
	} else {
		console.log("Connected");
	}

  client.close();
});



app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());