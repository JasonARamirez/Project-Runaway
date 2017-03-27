var History = require('../../models/history');
var Histories = require('../../collections/history');
module.exports = function(history, success){
  var toSave = new HistoryData(history, success);
  new History(toSave).save().then(function(newHistory){
    Histories.add(newHistory);
  });
}

function HistoryData(history, success){
  this.userID = history.userID;
  this.callType = history.type;
  this.success = success;
  this.time = new Date();
  this.intent = history.intent;
}
