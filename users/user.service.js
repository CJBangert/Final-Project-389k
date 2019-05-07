const config = require('config.json');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = `mongodb+srv://CJADMIN:SoundplowDB1@cluster0-rx3qh.mongodb.net/test?retryWrites=true0`;
const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = {
    authenticate,
    getAll,
    getById, 
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    console.log("Authenticating...")
    //var user;
    client.connect(function(err, client) {
        if (err) throw err;
            var dbo = client.db("Soundplow");
            //users = dbo.collection("Users")
            console.log('username:')
            console.log(username)
            dbo.collection("Users").findOne({'username':username},function(err, result){
                if(err) throw err;
                console.log(result)
                if (result && bcrypt.compareSync(password, result.password)) {
                    console.log("verifying password")
                    const token = jwt.sign({ sub: result.id }, config.secret);
                    result.online = true;
                    dbo.collection("Users").save(result)
                     return {
                        //...userWithoutHash,
                        token
                    };
                }
                else{
                    alert("Wrong password")
                    res.redirect('/')
                    //console.log("Shit went wrong matching the password fuck fuck fuck")
                }

        console.log("SENT!!!") });
        console.log("...")
            });
            

    
}


async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    console.log("Registering...")
    // if (await User.findOne({ username: userParam.username })) {
    //     throw 'Username "' + userParam.username + '" is already taken';
    // }
    userParam.music_interests = userParam.music_interests.split(" ")
    var user = new User(userParam);
    console.log("is unique..")
    if (userParam.password) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // ENCRYPt
             bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);

             // override the cleartext password with the hashed one
             user.password = hash;
             //next();
             });
        });
     }
    console.log("created new user...now uploading")
    // hash password
  //  console.log(JSON.stringify(user))
    // save user
   await client.connect(function(err, client) {
        if (err) throw err;
        var dbo = client.db("Soundplow");
        dbo.collection("Users").insertOne(user);
        console.log("SENT!!!") });
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}