var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
app.use(logger('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var _ = require("underscore");

app.get('/',function(req,res){
	 console.log("Going home...")
    res.render('home');
    console.log("home rendered")
    
  //  res.send("UNIMPLEMENTED ENDPOINT");
});	

app.get('/facebooklogin', function(req,res){
	console.log("Going to login")
	res.render('facebooklogin')
	console.log("login rendered")
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});