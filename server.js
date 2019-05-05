require('rootpath')();
const express = require('express');
const app = express();
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
var exphbs = require('express-handlebars');
var controller = require('./users/users.controller')
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
//app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);
// app.get('/',function(req,res){
// 	if(!req.user){
// 		console.log('redirecting...')
// 		res.redirect('/authenticate')
// 	}
// 	else{
// 		res.render('home')
// 	}
// });
// app.get('/authenticate',function(req,res){
// 	console.log("Going to auth...")
//     res.render('authenticate');
//     console.log("register auth")
    
//   //  res.send("UNIMPLEMENTED ENDPOINT");
// });
// app.get('/register', function(req,res){
// 	res.render('register');
// });

// app.post('/api/authenticate',function(req,res){

// 	// find the user
// 	controller.authenticate({
// 		name: req.body.name
// 	}, function(err, user) {

// 		if (err) throw err;

// 		if (!user) {
// 			res.json({ success: false, message: 'Authentication failed. User not found.' });
// 		} else if (user) {

// 			// check if password matches
// 			if (user.password != req.body.password) {
// 				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
// 			} else {

// 				// if user is found and password is right
// 				// create a token
// 				var payload = {
// 					admin: user.admin	
// 				}
// 				var token = jwt.sign(payload, app.get('superSecret'), {
// 					expiresIn: 86400 // expires in 24 hours
// 				});

// 				res.json({
// 					success: true,
// 					message: 'Enjoy your token!',
// 					token: token
// 				});
// 			}		

// 		}

// 	});

// })	
//const express = require('express');
//const router = express.Router();
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
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body) 
        .then(() => res.json({}) && res.render('home'))
        .catch(err => next(err));
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

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
