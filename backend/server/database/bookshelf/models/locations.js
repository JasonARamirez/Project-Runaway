var db = require('../db_config');

var location = db.Model.extend({
  tableName: 'Locations',
  hasTimestamps: false
});

module.exports = location;
