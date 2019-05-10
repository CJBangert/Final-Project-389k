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
var http = require('http').Server(app);
var io = require('socket.io')(http);
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
var Concert= require('./artist/artist.model')
const userService = require('./users/user.service');

// routes
app.post('/api/authenticate', authenticate);
app.post('/api/register', register);

//router.get('/', getAll);
//app.get('/current', getCurrent);
//app.get('/:id', getById);
//app.put('/:id', update);
app.delete('/:id', _delete);
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
    console.log("Going to auth...")
    res.render('authenticate');
    console.log("rendered auth")
    
  //  res.send("UNIMPLEMENTED ENDPOINT");
});
app.get('/register', function(req,res){
    
    res.render('register');
});
//module.exports = router;

function authenticate(req, res, next) {
    var x= userService.authenticate(req.body)
    if(x == 'ValidationError'){
      console.log('errorr')
      res.render('authenticate')
    }
    else if(x == null){
        res.render('authenticate')
      }
      else res.render('home')
}

function register(req, res, next) {
	console.log(req.body)
    userService.create(req.body).catch(err => next(err));
    io.emit('POST', req.body);

        console.log("Registration Successful! Going home...")
   res.render('home')
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


// MONGO CONNCTION
const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0`;
const client = new MongoClient(uri, { useNewUrlParser: true });

app.post('/api/addConcert',function(req,res){
  var lineup =  req.body.lineup;
  var date =  req.body.date;
  var price =  req.body.price;
  var location = req.body.location
  var friends_going =  req.body.friends_going;
  var id =  req.body.id;
  var newConcert = new Concert({
    lineup: lineup,
    date: date,
    price: price,
    location: location,
    friends_going: friends_going,
    id: id
  });
  client.connect(function(err, client) {
    if (err) throw err;
    var dbo = client.db("Soundplow");
    dbo.collection("concerts").insertOne(newConcert)
    console.log("saved new concert")
    io.emit('new concert posted', newConcert);
    return res.redirect('/concerts');
  })
})


app.get('/api/register',function(req,res){
  res.render('home');
});

app.get('/artist',function(req,res){
	client.connect(function(err, client) {
		if (err) throw err;
		var dbo = client.db("Soundplow");
  		dbo.collection("artists").find({}, { projection: { _id: 0, name: 1, genre: 1, tour_id: 1} }).toArray(function(err, result) {
   			if (err) throw err;
   			res.render('artist',{
				data: result
			});
    	});

	});
});

app.get('/allUsers',function(req,res){
	client.connect(function(err, client) {
		if (err) throw err;
		var dbo = client.db("Soundplow");
  		dbo.collection("Users").find({}, { projection: { _id: 0, username: 1, sex: 1, age: 1, music_interests: 1, concerts_going: 1} }).toArray(function(err, result) {
   			if (err) throw err;
   			res.render('allUsers',{
				data: result
			});
    	});

	});
});

app.get('/concerts',function(req,res){
	client.connect(function(err, client) {
		if (err) throw err;
		var dbo = client.db("Soundplow");
  		dbo.collection("concerts").find({}, { projection: { _id: 0, lineup: 1, date: 1, price: 1, location: 1, friends_going: 1, id: 1} }).toArray(function(err, result) {
   			if (err) throw err;
   			res.render('concerts',{
				data: result
			});
    	});

	});
});

app.get('/location',function(req,res){
	client.connect(function(err, client) {
		if (err) throw err;
		var dbo = client.db("Soundplow");
  		dbo.collection("venues").find({}, { projection: { _id: 0, name: 1, ids: 1} }).toArray(function(err, result) {
   			if (err) throw err;
   			res.render('location',{
				data: result
			});
    	});

	});
});
app.get('/descriptions',function(req,res){
	res.render('descriptions');
});



////////////////////////////////////////////
mongoose.connect('mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0',{useNewUrlParser: true});


app.post("/api/delete_id", function(req, res) {
    var a = req.body.id;
    client.connect(function(err, client) {
      if (err) throw err;
      var dbo = client.db("Soundplow");
      dbo.collection("concerts").deleteOne({id: a}, function(err, result) {
        if (err) throw err;
      });
      dbo.collection("concerts").find({}, { projection: { _id: 0, lineup: 1, date: 1, price: 1, location: 1, friends_going: 1, id: 1} }).toArray(function(err, resul) {
        if (err) throw err;
        res.render('concerts',{
          data: resul
        });
      });
    });
});

app.post("/api/delete_venue", function(req, res) {
    var a = req.body.name;

    client.connect(function(err, client) {
      if (err) throw err;
      var dbo = client.db("Soundplow");
      dbo.collection("venues").deleteOne({name: a}, function(err, result) {
        if (err) throw err;
      });
      dbo.collection("venues").find({}, { projection: { _id: 0, name: 1,  ids: 1} }).toArray(function(err, resul) {
        if (err) throw err;
        res.render('location',{
          data: resul
        });
      });
    });
});



var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat',function(req,res){
  res.render('chat')
})

// io.on('connection', function(socket) {
//     console.log('NEW connection.');
// });

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = http.listen(port, function () {
    console.log('Server listening on port ' + port);
});
