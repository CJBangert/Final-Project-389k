const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

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

module.exports = {
    User: require('../users/user.model')
};