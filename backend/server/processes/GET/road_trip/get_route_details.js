var getRoute = require('../../../database/database').retrieve.routes.getRouteDetails;
module.exports = function(routeID, callback){
  getRoute(routeID, function(err, route, start, end){
    callback(err, route, start, end);
  });
}
