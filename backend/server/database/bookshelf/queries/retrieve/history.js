var History = require('../../models/history');
var Histories = require('../../collections/history');

module.exports = {
  allHistory : function(userID, callback){
    Histories.query('where', {userID : userID}).fetch().then(function(histories){
      callback(null, histories.models);
    });
  }
}
