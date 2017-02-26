var db = require('../db_config');

var route = db.Model.extend({
  tableName: 'Routes',
  hasTimestamps: false,
  paths : function(){
    var Path = require('./paths');
    return this.hasMany(Path);
  },
  user : function(){
    var User = require('./users');
    return this.belongsTo(User, 'userID');
  }
});

module.exports = route;
