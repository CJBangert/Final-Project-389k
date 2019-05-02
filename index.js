var express = require('express');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
app.use(logger('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
var _ = require("underscore");

//MongoDB Connection
const MongoClient = require(‘mongodb’).MongoClient;
const uri = "mongodb+srv://CJADMIN:<password>@cluster0-rx3qh.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/',function(req,res){
	 console.log("Going home...")
    res.render('home');
    console.log("home rendered")
    
  //  res.send("UNIMPLEMENTED ENDPOINT");
});	

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});