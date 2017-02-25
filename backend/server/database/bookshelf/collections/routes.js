//configure the db
var db = require('../db_config');
//User app requires user table
var Route = require('../models/routes');

//make a new collection (set of db rows returned)
var Routes = new db.Collection();
//extends model class to Users
Users.model = Route;
//initialize Users in a module to easily reference later
module.exports = Routes;
