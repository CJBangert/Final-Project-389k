const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
//router.post('/api/authenticate', authenticate);
// router.post('/api/register', register);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.get('/authenticate')
router.delete('/:id', _delete);
router.get('/',function(req,res){
    if(!req.user){
        console.log('redirecting...')
        res.redirect('/authenticate')
    }
    else{
        res.render('home')
    }
});
// router.get('/authenticate',function(req,res){
//     console.log("Going to auth...")
//     res.render('authenticate');
//     console.log("register auth")
    
//   //  res.send("UNIMPLEMENTED ENDPOINT");
// });
router.get('/register', function(req,res){
    res.render('register');
});
module.exports = router;

// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
// }

// function register(req, res, next) {
//     userService.create(req.body)
//         .then(() => res.json({}))
//         .catch(err => next(err));
// }

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