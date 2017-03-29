var request = require('request');
var md5 = require('js-md5');
module.exports = function(host, firstName, lastName, username, password, email, callback){
  var newUser = new UserObj(firstName, lastName, username, password, email);
  var url = host + '/createUser?request=' + JSON.stringify(newUser);

  request.post(url, function(err, response, body){
    if(err){
      callback(err);
    }
    else{
      console.log(body);
      var data = JSON.parse(body);
      if(data.success == 1){
        callback(null, data.userID);
      }
      else{
        callback('createUser did not work');
      }
    }
  });
}

function UserObj(firstName, lastName, username, password, email){
  this.username = username;
  this.password = md5(password);
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
}
