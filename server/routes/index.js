var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/puppies/new", function(req, res, next) {
  res.render("newPuppy");
});

module.exports = router;
