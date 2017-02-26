module.exports = {
  verifyCreateUser : function(request, callback){
    hasCorrectProperties = checkJSONProperties(request);
    if(hasCorrectProperties){
      isDataValid = checkDataValid(request);
      if(isDataValid){
        callback(null);
      }
      else{
        callback(true);
      }
    }
    else{
      callback(true);
    }
  }
}

checkJSONProperties = function(request){
  hasUsername = request.hasOwnProperty('username');
  hasPassword = request.hasOwnProperty('password');
  hasFirstName = request.hasOwnProperty('firstName');
  hasLastName = request.hasOwnProperty('lastName');
  hasEmail = request.hasOwnProperty('email');

  return hasUsername && hasPassword && hasFirstName && hasLastName && hasLastName && hasEmail;
}

checkDataValid = function(request){
  var usernameRegEx = /^[a-zA-Z0-9]+$/;
  var username = request.username;
  var validUsername = username.match(usernameRegEx).length > 0;

  console.log('Username: ' + validUsername);

  var numPassword = parseInt(request.password, 10);
  var validPassword = !isNaN(numPassword);

  console.log('Password: ' + validPassword);

  var firstAndLastName = request.firstName + ' ' + request.lastName;
  var firstAndLastNameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
  var validName = firstAndLastName.match(firstAndLastNameRegEx).length > 0;

  console.log('Name: ' + validName);

  var email = request.email;
  var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var validEmail = email.match(emailRegEx).length > 0;
  console.log('Email: ' + validEmail);

  return validUsername && validPassword && validName && validEmail;
}
