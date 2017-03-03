function Path(step, numPath){
  this.distance = metersToMiles(step.distance.value);
  this.polyline = step.polyline.points;
  var startLat = step.start_location.lat;
  var startLng = step.start_location.lng;
  this.start = [startLat, startLng];
  var endLat = step.end_location.lat;
  var endLng = step.end_location.lng;
  this.end = [endLat, endLng];
  this.numPath = numPath;
  this.time = step.duration.value;
}

var metersToMiles = function(meters){
  return meters * 0.000612371;
}

module.exports = Path;
