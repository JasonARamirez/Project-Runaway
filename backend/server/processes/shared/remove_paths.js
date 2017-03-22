var deletePaths = require('../../database/database').del.paths
module.exports = function(routeID, callback){
  deletePaths(routeID, function(err){
    callback(err);
  });
}
