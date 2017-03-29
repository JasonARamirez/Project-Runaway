//configure the db
var db = require('../db_config');
//User app requires user table
var History = require('../models/history');

//make a new collection (set of db rows returned)
var Histories = new db.Collection();
//extends model class to Users
Histories.model = History;
//initialize Users in a module to easily reference later
module.exports = Histories;
