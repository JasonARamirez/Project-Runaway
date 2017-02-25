/**
Configure the db by creating various tables
*/

//knex object that will establish a connection to the mySQL db on the server
var knex = require('knex')({
  client: 'mysql',
  connection: {
   host: 'us-cdbr-iron-east-04.cleardb.net',
   user: 'baa5e06bbc2b9b',
   password: '29da063d',
   database: 'heroku_625012f21956424'
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
      table.string('userPassword', 20);
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
      table.integer('startLocID');
      table.integer('endLocID');
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
      //make a string called userID to represent an assigned userID to be stored with a max of 37 characters
      table.increments('ID').primary();
      table.string('routeID', 37);
      table.integer('pos');
      table.double('time');
      table.double('distance');
      table.integer('startLocID');
      table.integer('endLocID');
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
      table.double('long');
    }).then(function(table) {
      //print to user that it created the Users table
      console.log('created table :', 'Locations');
    })
  }
});
