var db = require('../db_config');

var path = db.Model.extend({
  tableName: 'Paths',
  hasTimestamps: false,
  route : function(){
    var Route = require('./routes');
    return this.belongsTo(Route, 'routeID');
  },
  start : function(){
    var Location = require('./locations');
    return this.hasOne(Location, 'ID', 'startID');
  },
  end : function(){
    var Location = require('./locations');
    return this.hasOne(Location, 'ID', 'startID');
  }
});

module.exports = path;
