$(document).ready(function(){
  $("#header").load("header.html");
});

function validateSignInForm(){
  var usernameRegEx = /^[a-zA-Z0-9]+$/;
  var username = $('#username').val();
  var validUsername = username.match(usernameRegEx).length > 0;

  var passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  var password = $('#password').val();
  var validPassword = passwordRegEx.test(password);

  if(validUsername && validPassword){
    var passwordToSend = md5(password);
    var request = JSON.stringify({
      username : username,
      password : passwordToSend
    });
    var data = {
      request : request
    }
    $.get('login', data, function(dataReturned, status){
      var dataJSON = JSON.parse(dataReturned);
      if(dataJSON.success == 1){
        sessionStorage.setItem('key', dataJSON.userID);
        document.location.href = '/dev';
      }
      else{
        alert("Incorrect Username or password");
      }
    });
  }
  else{
    console.log('Incorrect formatting');
    alert("Incorrect Username or Password");
  }
}
