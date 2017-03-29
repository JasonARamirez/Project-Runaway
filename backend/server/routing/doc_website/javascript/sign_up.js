$(document).ready(function(){
  $("#header").load("header.html");
});

function validateSignUpForm(){
  var usernameRegEx = /^[a-zA-Z0-9]+$/;
  var username = $('#username').val();
  var validUsername = username.match(usernameRegEx).length > 0;

  var passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  var password = $('#password').val();
  var validPassword = passwordRegEx.test(password);

  var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var email = $('#email').val();
  var validEmail = email.match(emailRegEx).length > 0;

  var firstName = $('#firstName').val();
  var lastName = $('#lastName').val();
  var firstAndLastName = firstName + ' ' + lastName;
  var firstAndLastNameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
  var validName = firstAndLastName.match(firstAndLastNameRegEx).length > 0;

  if(!validName){
    alert('Invalid First or Last Name');
  }
  if(!validEmail){
    alert('Invalid Email');
  }
  if(!validUsername){
    alert("Invalid Username, must only contain letters and numbers.");
    return;
  }
  if(!validPassword){
    alert("Invalid Password");
    return;
  }
  if(password != $('#confirmPassword').val()){
    alert("Passwords do not match");
    return;
  }

  var data = createData(firstName, lastName, email, username, md5(password));

  $.post('createUser' + data, function(dataReturned, status){
    var dataJSON = JSON.parse(dataReturned);
    if(dataJSON.success == 1){
      sessionStorage.setItem('key', dataJSON.userID);
      document.location.href = '/dev';
    }
    else{
      alert("Username or Email already exists");
    }
  });
}

function createData(firstName, lastName, email, username, password){
  var request = JSON.stringify({
    username : username,
    password : password,
    firstName : firstName,
    lastName : lastName,
    email : email
  });
  var toReturn = '?request=' + request
  return toReturn;
}
