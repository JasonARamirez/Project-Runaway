var Users = require('../../collections/users');
var User = require('../../models/users');

module.exports = {
  isUserID = function(userID, callback){
    User.where('ID', userID).fetch().then(function(found){
        if(found){
          //userID was found in db, return true
          callback(null, true);
        } else {
          //userID was not found in db, return false
          callback(null, false);
        }
      });
  }
}
