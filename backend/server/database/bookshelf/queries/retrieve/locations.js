var Location = require('../../models/locations');
var Locations = require('../../collections/locations');

module.exports = {
  getID : function(loc, callback){
    Location.where(new latLng(loc)).fetch().then(function(found){
      if(found){
        callback(null, found.attributes.ID);
      }
      else{
        callback(null, null);
      }
    });
  }
}

function latLng(loc){
  this.lat = loc[0];
  this.lng = loc[1];
}
