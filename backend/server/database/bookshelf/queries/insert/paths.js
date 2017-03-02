var Path = require('../../models/paths');
var Paths = require('../../collections/paths');
module.exports = function(path, routeID, startID, endID, callback){
  var toInsert = new PathToInsert(path, routeID, startID, endID);
  new Path(toInsert).save().then(function(newPath){
    Paths.add(newPath);
    callback(null, newPath.attributes.ID);
  });
}

function PathToInsert(path, routeID, startID, endID){
  this.routeID = routeID;
  this.pos = path.numPath;
  this.time = path.time;
  this.distance = path.distance;
  this.startID = startID;
  this.endID = endID;
}
