var doesUsernameExist = require('../../database/database').retrieve.users.doesUsernameExist;
module.exports = function(request, callback){
  var username = request.username;
  doesUsernameExist(username, function(err, exists){
    callback(err, exists);
  });
}
