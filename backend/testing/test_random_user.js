var createUser = require('./create_user');
var createRoute = require('./create_route');

var site = 'http://localhost:8080';
var firstName = 'Jason';
var lastName = 'Ramirez';
var email = 'jp51371@iastate.edu';
var username = 'jp51371';
var password = 'password';

module.exports = function(site){

  var firstName = createRandomName();
  var lastName = createRandomName();
  var username = createRandomUserNameOrPassword();
  var password = createRandomUserNameOrPassword();
  var email = createRandomEmail();

  var firstStartLat = getRandomLatUSA(5);
  var firstStartLng = getRandomLngUSA(5);
  var firstEndLat = getRandomLatUSA(5);
  var firstEndLng = getRandomLngUSA(5);
  var firstDate = addRandomMinutes(new Date());

  var secondStartLat = getRandomLatUSA(5);
  var secondStartLng = getRandomLngUSA(5);
  var secondEndLat = getRandomLatUSA(5);
  var secondEndLng = getRandomLngUSA(5);
  var secondDate = addRandomMinutes(new Date());

  var test_random_user = function(callback){
    createUser(site, firstName, lastName, username, password, email, function(err, userID){
      if(err){
        console.log('createUser err: ' + err);
        callback(err);
      }
      else{
        console.log('createUser success: ' + userID);
        createRoute(site, userID, firstStartLat, firstStartLng, firstEndLat, firstEndLng, firstDate, function(err, routeID, route){
          if(err){
            console.log('createRoute err: ' + err);
            callback(err);
          }
          else{
            console.log(route);
            console.log('roadTrip success: ' + routeID);
            weatherAlongRoute(site, userID, routeID, 0, 15, function(err, weatherCards){
              if(err){
                console.log('weatherAlongRoute err: ' + err);
                callback(err);
              }
              else{
                console.log(weatherCards);
                console.log('weatherAlongRoute success, time: 15 min');
                weatherAlongRoute(site, userID, routeID, 1, 15, function(err, weatherCards){
                  if(err){
                    console.log('weatherAlongRoute err: ' + err);
                    callback(err);
                  }
                  else{
                    console.log('weatherAlongRoute success, distance: 15 miles');
                    changeStart(site, userID, routeID, secondDate, function(err){
                      if(err){
                        console.log('changeStart err: ' + err);
                        callback(err);
                      }
                      else{
                        console.log('changeStart success');
                        login()
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };
}

var createRandomUserNameOrPassword = function(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var createRandomName = function(){
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var getRandomLatUSA = function(fixed) {
  var to = 24.396308;
  var from = -124.848974;
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var getRandomLngUSA = function(fixed) {
  var to = 49.384358;
  var from = -66.885444;
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var addRandomMinutes = function(date) {
    return new Date(date.getTime() + getRandomIntInclusive(10, 3600)*60000);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomEmail() {
    var strValues="abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i=0;i<10;i++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strTmp = "";
    strEmail = strEmail + "@";
    for (var j=0;j<8;j++) {
        strTmp = strValues.charAt(Math.round(strValues.length*Math.random()));
        strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + ".com"
    return strEmail;
}
