var async = require('async');
var getAddress = require('../../../external_apis/google_maps/google_maps').getAddress;
module.exports = function(startLocation, endLocation, callback){
  var asyncTasks = createTasks(startLocation, endLocation);
  async.parallel(asyncTasks, function(err, addresses){
    callback(err, addresses[0], addresses[1]);
  });
}

var createTasks = function(startLocation, endLocation){
  var tasks = [];
  var startTask = function(callback){
    getAddress(startLocation, callback);
  }
  tasks.push(startTask);
  var endTask = function(callback){
    getAddress(endLocation, callback);
  }
  tasks.push(endTask);
  return tasks;
}
