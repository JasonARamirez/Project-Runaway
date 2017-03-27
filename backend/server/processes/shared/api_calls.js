var deleteCancelTripString = 'DELETE: cancelTrip';
var deleteCancelTripInt = 0;

var getAllTripsStartEndDataString = 'GET: allTripsStartEndData';
var getAllTripsStartEndDataInt = 1;

var getLoginString = 'GET: login';
var getLoginInt = 2;

var getRoadTripString = 'GET: roadTrip';
var getRoadTripInt = 3;

var getWeatherAlongRouteString = 'GET: weatherAlongRoute';
var getWeatherAlongRouteInt = 4;

var getWeatherAtLocationString = 'GET: weatherAtLocation';
var getWeatherAtLocationInt = 5;

var patchChangeStartTimeString = 'PATCH: changeStartTime';
var patchChangeStartTimeInt = 6;

var patchCompletedTripString = 'PATCH: completedTrip';
var patchCompletedTripInt = 7;

var postCreateUserString = 'POST: createUser';
var postCreateUserInt = 8;

var postRoadTripString = 'POST: roadTrip';
var postRoadTripInt = 9;

var getAllAPIHistoryString = 'GET: allAPIHistory';
var getAllAPIHistoryInt = 10;

module.exports = {
  'DELETE: cancelTrip' : deleteCancelTripInt,
  0 : deleteCancelTripString,
  deleteCancelTripString : deleteCancelTripString,

  'GET: allTripsStartEndData' : getAllTripsStartEndDataInt,
  1 : getAllTripsStartEndDataString,
  getAllTripsStartEndDataString : getAllTripsStartEndDataString,

  'GET: login' : getLoginInt,
  2 : getLoginString,
  getLoginString : getLoginString,

  'GET: roadTrip' : getRoadTripInt,
  3 : getRoadTripString,
  getRoadTripString : getRoadTripString,

  'GET: weatherAlongRoute' : getWeatherAlongRouteInt,
  4 : getWeatherAlongRouteString,
  getWeatherAlongRouteString : getWeatherAlongRouteString,

  'GET: weatherAtLocation' : getWeatherAtLocationInt,
  5 : getWeatherAtLocationString,
  getWeatherAtLocationString : getWeatherAtLocationString,

  'PATCH: changeStartTime' : patchChangeStartTimeInt,
  6 : patchChangeStartTimeString,
  patchChangeStartTimeString : patchChangeStartTimeString,

  'PATCH: completedTrip' : patchCompletedTripInt,
  7 : patchCompletedTripString,
  patchCompletedTripString : patchCompletedTripString,

  'POST: createUser' : postCreateUserInt,
  8 : postCreateUserString,
  postCreateUserString : postCreateUserString,

  'POST: roadTrip' : postRoadTripInt,
  9 : postRoadTripString,
  postRoadTripString : postRoadTripString,

  'GET: allAPIHistory' : getAllAPIHistoryInt,
  10 : getAllAPIHistoryString,
  getAllAPIHistoryString : getAllAPIHistoryString,
}
