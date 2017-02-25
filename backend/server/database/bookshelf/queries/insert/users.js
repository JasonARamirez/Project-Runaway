var Users = require('../../collections/users');
var User = require('../../models/users');

module.exports = {
  createUser = function(userData, callback){
    var userToInsert = {
      ID: userData.userID,
      userName : userData.username,
      userPassword : userData.password,
      firstName : userData.firstName,
      lastName : userData.lastName,
      email : userData.email
    }
    new User(userToInsert).save().then(function(newUser){
      Users.add(newUser);
      callback(null)
    });
  }
}
