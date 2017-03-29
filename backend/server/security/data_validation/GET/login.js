module.exports = function(req, callback){
  hasCorrectProperties = checkLoginJSONProperties(req);
  if(hasCorrectProperties){
    isValid = validateLogin(req);
    if(isValid){
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

var checkLoginJSONProperties = function(req){
  var hasUsername = req.hasOwnProperty('username');
  var hasPassword = req.hasOwnProperty('password');
  var hasWithRoutes = req.hasOwnProperty('withRoutes');

  return hasUsername && hasPassword && hasWithRoutes;
}

var validateLogin = function(req){
  var usernameRegEx = /^[a-zA-Z0-9]+$/;
  var username = req.username;
  var validUsername = username.match(usernameRegEx).length > 0;

  console.log('Username: ' + validUsername);

  var numPassword = parseInt(req.password, 10);
  var validPassword = !isNaN(numPassword);

  console.log('Password: ' + validPassword);

  var withRoutes = req.withRoutes;
  var numWithRoutes = parseInt(withRoutes, 10);
  var validWithRoutes = !isNaN(numWithRoutes);
  validWithRoutes = validWithRoutes && validWithRoutes >= 0 && validWithRoutes <= 1;

  return validUsername && validPassword && validWithRoutes;
}
