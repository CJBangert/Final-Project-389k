require('rootpath')();
const express = require('express');
const app = express();
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
var exphbs = require('express-handlebars');
app.use(logger('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var _ = require("underscore");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
app.get('/',function(req,res){
	if(!req.user){
		console.log('redirecting...')
		res.redirect('/authenticate')
	}
	else{
		res.render('home')
	}
});
app.get('/authenticate',function(req,res){
	console.log("Going to register...")
    res.render('authenticate');
    console.log("register rendered")
    
  //  res.send("UNIMPLEMENTED ENDPOINT");
});
app.get('/register', function(req,res){
	res.render('register');
});

app.post('/users',function(req,res){

})	


// MONGO CONNCTION
const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0`;
const client = new MongoClient(uri, { useNewUrlParser: true });

const db = require('_helpers/db');
const Artis = db.Artis;

app.get('/artist',function(req,res){
	client.connect(function(err, client) {
		if (err) throw err;
		var dbo = client.db("Soundplow");
  		dbo.collection("artists").find({}, { projection: { _id: 0, name: 1, genre: 1} }).toArray(function(err, result) {
   			if (err) throw err;
   			res.render('artist',{
				data: result
			});
    	});
  		client.close();
	});
});



// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
