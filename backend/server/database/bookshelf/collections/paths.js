//configure the db
var db = require('../db_config');
//User app requires user table
var Path = require('../models/paths');

//make a new collection (set of db rows returned)
var Paths = new db.Collection();
//extends model class to Users
Paths.model = Path;
//initialize Users in a module to easily reference later
module.exports = Paths;
