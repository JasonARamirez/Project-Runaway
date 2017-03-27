var getZipCodes = require('./read_all_zip_codes');

module.exports = function(numTrips, callback){
  getZipCodes('zip_codes_latlng.csv', function(err, data){
    if(err == null){
      var trips = [];
      var size = data.length - 1;
      for(var index = 0; index < numTrips; index++){
        var start = getRandomInt(1, size);
        var end = 0;
        do{
          end = getRandomInt(1, size);
        }while(start == end);
        trips.push(new Trip(data[start], data[end]));
      }
      callback(null, trips);
    }
    else{
      callback(err);
    }
  });
}

function Trip(startData, endData){
  this.start = [startData[1], startData[2]];
  this.end = [endData[1], endData[2]];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
