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

mongoose.Promise = global.Promise;

const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://CJADMIN:%24oundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true";
const cliyent = new MongoClient(uri, { useNewUrlParser: true });
cliyent.connect(err => {
  const collection = cliyent.db("Soundplow").collection("Users");
  // perform actions on the collection object
  client.close();
});


app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());