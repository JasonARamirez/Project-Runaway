var db = require('../db_config');

var history = db.Model.extend({
  tableName: 'History',
  hasTimestamps: false
});

module.exports = history;
