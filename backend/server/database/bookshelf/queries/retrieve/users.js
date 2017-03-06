var Users = require('../../collections/users');
var User = require('../../models/users');

module.exports = {
  isUserID : function(userID, callback){
    User.where('ID', userID).fetch().then(function(found){
        if(found){
          //userID was found in db, return true
          callback(null, true);
        } else {
          //userID was not found in db, return false
          callback(null, false);
        }
      });
  },

  doesEmailExist : function(email, callback){
    User.where('email', email).fetch().then(function(found){
      if(found){
        callback(null, true);
      }
      else{
        callback(null, false);
      }
    })
  },

  doesUsernameExist : function(username, callback){
    User.where('userName', username).fetch().then(function(found){
      if(found){
        callback(null, true);
      }
      else{
        callback(null, false);
      }
    });
  },

  getPassword : function(username, callback){
    User.where('userName', username).fetch().then(function(found){
      if(found){
        callback(null, found.attributes.userPassword);
      }
      else{
        callback(true, null);
      }
    });
  },

  getUserData : function(username, password, callback){
    User.where({userName : username, userPassword : password}).fetch().then(function(found){
      if(found){
        callback(null, found);
      }
      else{
        callback(true, null);
      }
    });
  }
}
