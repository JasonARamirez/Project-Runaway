//configure the db
var db = require('../db_config');
//User app requires user table
var User = require('../models/paths');

//make a new collection (set of db rows returned)
var Paths = new db.Collection();
//extends model class to Users
Users.model = Path;
//initialize Users in a module to easily reference later
module.exports = Paths;
