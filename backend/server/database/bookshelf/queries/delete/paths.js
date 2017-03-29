var Path = require('../../models/paths');
var Paths = require('../../collections/paths');
module.exports = function(routeID, callback){
  Path.query().whereIn('routeID', [routeID]).del().then(function(){
    callback(null);
  });
}
