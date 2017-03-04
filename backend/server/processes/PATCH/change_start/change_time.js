var changeRouteStart = require('../../../database/database').modify.routes.changeTime;

module.exports = function(routeID, startTime, callback){
  changeRouteStart(routeID, startTime, function(err){
    callback(err);
  });
}
