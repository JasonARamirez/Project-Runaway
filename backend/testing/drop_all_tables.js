var knex = require('knex')({
  client: 'mysql',
  connection: {
   host: 'us-cdbr-iron-east-04.cleardb.net',
   user: 'baa5e06bbc2b9b',
   password: '29da063d',
   database: 'heroku_625012f21956424'
 }
});

module.exports = function(){
  knex.schema.dropTableIfExists('Users').then(function(){
    console.log('Dropped Users');
  });
  knex.schema.dropTableIfExists('Routes').then(function(){
    console.log('Dropped Routes');
  });
  knex.schema.dropTableIfExists('Paths').then(function(){
    console.log('Dropped Paths');
  });
  knex.schema.dropTableIfExists('Locations').then(function(){
    console.log('Dropped Locations');
  });
}
