var express = require('express');
var router = express.Router();
var puppies = [];
var people = [];

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/puppies/new', function(req, res, next) {
  res.render('newPuppy');
});

router.get('/people/new', function(req, res, next) {
  res.render('newPeople');
});

router.post("/puppies", function(req, res, next) {
  var name = req.body.name;
  var id = req.body.id;
  var puppy = new Puppy(name, id);
  var errors = validationCheck(name, id);
  console.log(errors);
  if (errors.length > 0) {
    res.render("newPuppy", {errors: errors});
  } else {
    puppies.push(puppy);
    res.render("puppies", {
      puppies: puppies,
      success: "The puppy was saved successfully"
    });
  }
});

router.post("/people", function(req, res, next) {
  var name = req.body.name;
  var id = req.body.id;
  var person = new Person(name, id);
  var errors = validationCheck(name, id);
  if (errors.length > 0) {
    res.render("newPeople", {errors: errors});
  } else {
    people.push(person);
    res.render("people", {
      people: people,
      success: "The person was saved successfully"
    });
  }
});

var Puppy = function(name, id) {
  this.name = name;
  this.id = id;
};

var Person = function(name, id) {
  this.name = name;
  this.id = id;
};

function validationCheck(name, id) {

  var errorArray = [];
  var nameTrimmed = name.trim();
  var idTrimmed = id.trim();

  if(nameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  if(idTrimmed === '') {
    errorArray.push('Id cannot be blank.');
  } else if (idTrimmed.length < 3) {
    errorArray.push('A Id must be at least 3 characters long.');
  }

  return errorArray;

}

module.exports = router;
