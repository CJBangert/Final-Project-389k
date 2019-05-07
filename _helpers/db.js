const config = require('config.json');
const mongoose = require('mongoose');
var User = require('../users/user.model')
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
try{
	mongoose.Promise = global.Promise;
}
catch(err){
	throw err;
}

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(function(err, client) {
	connectTimeoutMS = 10000;
	assert.equal(null, err);
  	if (err) {
		throw err;
	} else {
		console.log("Connected");
	}

 // client.close();
});


// save user to database

// fetch user and test password verification


module.exports = {
    User: require('../users/user.model')
};

// <<<<<<< HEAD

// =======
// module.exports = {
// 	Artis: require('../server')
// }
// >>>>>>> dietzAPI
