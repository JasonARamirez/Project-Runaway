var apiCalls = require('./api_calls');
module.exports = function(userID, type, intent){
  this.userID = userID;
  this.type = apiCalls[type];
  this.intent = intent;
}
