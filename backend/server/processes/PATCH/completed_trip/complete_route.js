var completeRoute = require('../../../database/database').modify.routes.completeRoute;
module.exports = function(routeID, callback){
  completeRoute(routeID, function(err){
    callback(err);
  });
}
