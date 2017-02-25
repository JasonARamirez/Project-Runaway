//configure the db
var db = require('../db_config');
//User app requires user table
var User = require('../models/users');

//make a new collection (set of db rows returned)
var Users = new db.Collection();
//extends model class to Users
Users.model = User;
//initialize Users in a module to easily reference later
module.exports = Users;
