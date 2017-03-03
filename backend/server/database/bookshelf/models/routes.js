var db = require('../db_config');

var route = db.Model.extend({
  tableName: 'Routes',
  hasTimestamps: false,
  paths : function(){
    var Path = require('./paths');
    return this.hasMany(Path, 'routeID', 'ID');
  },
  user : function(){
    var User = require('./users');
    return this.belongsTo(User, 'userID');
  },
  startLocation : function(){
    var Location = require('./locations');
    return this.hasOne(Location, 'startID');
  },
  endLocation : function(){
    var Location = require('./locations');
    return this.hasOne(Location, 'endID');
  }
});

module.exports = route;
