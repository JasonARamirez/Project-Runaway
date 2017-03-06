var doesUserIDExist = require('../../database/database').retrieve.users.isUserID;
module.exports = function(userID, callback){
  doesUserIDExist(userID, function(err, exists){
    if(exists){
      callback(true);
    }
    else{
      callback(false);
    }
  });
}
