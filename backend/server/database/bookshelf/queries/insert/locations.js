var Location = require('../../models/locations');
var Locations = require('../../collections/locations');
var getLocationID = require('../retrieve/retrieve').locations.getID;
module.exports = function(loc, callback){
  getLocationID(loc, function(err, routeID){
    if(err == null){
      if(routeID != null){
        callback(null, routeID);
      }
      else{
        insertNewLocation(loc, callback);
      }
    }
    else{
      callback(err, null);
    }
  });
}

var insertNewLocation = function(loc, callback){
  var latLng = {
    lat : loc[0],
    lng : loc[1]
  }
  new Location(latLng).save().then(function(newLocation){
    Locations.add(newLocation);
    callback(null, newLocation.attributes.id);
  });
}
