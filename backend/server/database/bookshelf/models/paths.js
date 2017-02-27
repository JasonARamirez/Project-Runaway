var db = require('../db_config');

var path = db.Model.extend({
  tableName: 'Routes',
  hasTimestamps: false
  route : function(){
    var Route = require('./routes');
    return this.belongsTo(Route, 'routeID');
  }
});

module.exports = path;
