module.exports = function(request, callback){
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

checkJSONProperties = function(request){
  hasUsername = request.hasOwnProperty('username');
  hasPassword = request.hasOwnProperty('password');
  hasFirstName = request.hasOwnProperty('firstName');
  hasLastName = request.hasOwnProperty('lastName');
  hasEmail = request.hasOwnProperty('email');

  return hasUsername && hasPassword && hasFirstName && hasLastName && hasLastName && hasEmail;
}

checkDataValid = function(request){
  var usernameRegEx = new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$');
  var username = request.username;
  var validUsername = usernameRegEx.test(username);

  var numPassword = parseInt(request.password, 10);
  var validPassword = !isNaN(numPassword);

  var firstName = request.firstName;
  var firstAndLastNameRegEx = new RegExp('^([a-z]+[,.]?[ ]?|[a-z]+[\'-]?)+$');
  var validFirstName = firstAndLastNameRegEx.test(firstName);

  var lastName = request.firstName;
  var validLastName = firstAndLastNameRegEx.test(lastName);

  var email = request.email;
  var emailRegEx = new RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
  var validEmail = emailRegEx.test(email);

  return validUsername && validPassword && validFirstName && validLastName && validEmail;
}
