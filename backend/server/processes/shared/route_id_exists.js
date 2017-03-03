var doesRouteIDExist = require('../../database/database').retrieve.routes.isRouteIDActive;
module.exports = function(routeID, userID, callback){
  doesRouteIDExist(routeID, userID, function(err, exists){
    if(exists){
      callback(true);
    }
    else{
      callback(false);
    }
  });
}
