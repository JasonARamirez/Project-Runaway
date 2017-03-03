module.exports = function(startTime){
  var startTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2}):(\d{2}):(\d{2})$/;
  var matches = startTime.match(startTimeRegex);
  return createDate(matches);
}

function createDate(matches){
  var year = parseInt(matches[3], 10);
  var month = parseInt(matches[2], 10) - 1; // months are 0-11
  var day = parseInt(matches[1], 10);
  var hour = parseInt(matches[4], 10);
  var minute = parseInt(matches[5], 10);
  var second = parseInt(matches[6], 10);
  return new Date(year, month, day, hour, minute, second);
}
