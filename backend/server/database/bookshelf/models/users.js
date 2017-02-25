var db = require('../db_config');

var user = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: false,
  routes = function(){
    var Route = require('./routes');
    return this.hasMany(Route);
  }
});

module.exports = user;
