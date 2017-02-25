//configure the db
var db = require('../db_config');
//User app requires user table
var Location = require('../models/locations');

//make a new collection (set of db rows returned)
var Locations = new db.Collection();
//extends model class to Users
Users.model = Location;
//initialize Users in a module to easily reference later
module.exports = Locations;
