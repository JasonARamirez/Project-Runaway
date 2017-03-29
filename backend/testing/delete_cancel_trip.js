var request = require('request');

module.exports = function(host, userID, routeID, callback){
  var url = host + '/cancelTrip?request=' + JSON.stringify({userID : userID, routeID : routeID});

  request.delete(url, function(err, response, body){
    if(err){
      callback(err);
    }
    else{
      var data = JSON.parse(body);
      if(data.success == 1){
        callback(null);
      }
      else{
        callback('delete cancel trip failed');
      }
    }
  });
}
