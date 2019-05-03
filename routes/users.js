var express = require('express');
var router = express.Router()
var logger = require('morgan');
router.use(logger());

router.use(express.static(__dirname + '/public'));
/* GET users listing. */

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

module.exports = router;
