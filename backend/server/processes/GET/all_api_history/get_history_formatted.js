var getAllHistory = require('../../../database/database').retrieve.history.allHistory;

module.exports = function(userID, callback){
  getAllHistory(userID, function(err, histories){
    if(err == null){
      histories.sort(sortByEarliestDate);
      var formattedHistory = formatHistory(histories);
      callback(null, formattedHistory);
    }
    else{
      callback(err,null);
    }
  });
}

var formatHistory = function(historires){
  var formattedHistory = new FormattedHistories();
  historires.forEach(function(history){
    formattedHistory.insert(history.attributes);
  });
  return formattedHistory;
}

var sortByEarliestDate = function(a, b){
  return b.time - a.time;
}

function FormattedHistories(){
  this.deleteCancelTrip = [];
  this.getAllTripsStartEndData = [];
  this.getLogin = [];
  this.getRoadTrip = [];
  this.getWeatherAlongRoute = [];
  this.getWeatherAtLocation = [];
  this.patchChangeStartTime = [];
  this.patchCompletedTrip = [];
  this.postCreateUser = [];
  this.postRoadTrip = [];
  this.getAllAPIHistory = [];

  this.insert = function(history){
    console.log(history);
    switch(history.callType) {
      case 0:
          this.deleteCancelTrip.push(new FormattedHistory(history));
          break;
      case 1:
          this.getAllTripsStartEndData.push(new FormattedHistory(history));
          break;
      case 2:
          this.getLogin.push(new FormattedHistory(history));
          break;
      case 3:
          this.getRoadTrip.push(new FormattedHistory(history));
          break;
      case 4:
          this.getWeatherAlongRoute.push(new FormattedHistory(history));
          break;
      case 5:
          this.getWeatherAtLocation.push(new FormattedHistory(history));
          break;
      case 6:
          this.patchChangeStartTime.push(new FormattedHistory(history));
          break;
      case 7:
          this.patchCompletedTrip.push(new FormattedHistory(history));
          break;
      case 8:
          this.postCreateUser.push(new FormattedHistory(history));
          break;
      case 9:
          this.postRoadTrip.push(new FormattedHistory(history));
          break;
      case 10:
          this.getAllAPIHistory.push(new FormattedHistory(history));
          break;
      default:
        console.log('Invalid History: ' + history);
    }
  }
}

function FormattedHistory(history){
  this.time = history.time;
  this.intent = history.intent;
  this.success = history.success;
}
