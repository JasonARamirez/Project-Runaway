/**
Configure the db by creating various tables
*/

//knex object that will establish a connection to the mySQL db on the server
var knex = require('knex')({
  client: 'mysql',
  connection: {
   host: 'us-cdbr-iron-east-03.cleardb.net',
   user: 'b9a1a7a3aea37b',
   password: '082cb188',
   database: 'heroku_d1e3a728315a316'
 }
});

//bookshel object creation
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    //create a table in the db using knex's createTable method
    db.knex.schema.createTable('Users', function(table) {
      //make a string called userID to represent an assigned userID to be stored with a max of 37 characters
      table.string('ID', 37).primary();
      //userName the user chooses with limit of 20 characters
      table.string('userName', 20);
      table.string('userPassword', 32);
      table.string('firstName', 50);
      table.string('lastName', 50);
      table.string('email', 50);
    }).then(function(table) {
      //print to user that it created the Users table
      console.log('created table :', 'Users');
    })
  }
});

db.knex.schema.hasTable('Routes').then(function(exists) {
  if (!exists) {
    //create a table in the db using knex's createTable method
    db.knex.schema.createTable('Routes', function(table) {
      //make a string called userID to represent an assigned userID to be stored with a max of 37 characters
      table.string('ID', 37).primary();
      table.string('userID', 37);
      table.dateTime('startTime');
      table.integer('startID');
      table.integer('endID');
      table.bool('done');
      table.bool('canceled');
    }).then(function(table) {
      //print to user that it created the Users table
      console.log('created table :', 'Routes');
    })
  }
});

db.knex.schema.hasTable('Paths').then(function(exists) {
  if (!exists) {
    //create a table in the db using knex's createTable method
    db.knex.schema.createTable('Paths', function(table) {
      table.increments('ID').primary();
      table.string('routeID', 37);
      table.integer('pos');
      table.integer('time');
      table.double('distance');
      table.integer('startID');
      table.integer('endID');
    }).then(function(table) {
      //print to user that it created the Users table
      console.log('created table :', 'Paths');
    })
  }
});

db.knex.schema.hasTable('Locations').then(function(exists) {
  if (!exists) {
    //create a table in the db using knex's createTable method
    db.knex.schema.createTable('Locations', function(table) {
      //make a string called userID to represent an assigned userID to be stored with a max of 37 characters
      table.increments('ID').primary();
      table.double('lat');
      table.double('lng');
    }).then(function(table) {
      //print to user that it created the Users table
      console.log('created table :', 'Locations');
    })
  }
});

module.exports = db;
