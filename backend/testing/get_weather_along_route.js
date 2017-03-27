var request = require('request');

module.exports = function(host, userID, routeID, callback){
  var url = host + '/weatherAlongRoute?request=' + JSON.stringify({userID : userID, routeID : routeID, timeOrDistance : 0, interval : 30});

  request.get(url, {timeout : 60000}, function(err, response, body){
    if(err){
      callback(err);
    }
    else{
      var data = JSON.parse(body);
      if(data.success == 1){
        callback(null);
      }
      else{
        callback('get weather along route failed');
      }
    }
  });
}
