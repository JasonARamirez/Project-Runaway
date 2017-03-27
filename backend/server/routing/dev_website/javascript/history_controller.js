app.controller('history_controller',function($scope, $location){
  $scope.init = function(){
    getHistory(function(newHistory){
      console.log(newHistory);
      $scope.$apply(function() {
        $scope.history = newHistory;
      });
    });
  }
});

var getHistory = function(callback){
  var data = {
    request : JSON.stringify({userID : sessionStorage.getItem('key')})
  }
  $.get('allAPIHistory', data, function(dataReturned, status){
    var dataJSON = JSON.parse(dataReturned);
    if(dataJSON.success == 1){
      callback(dataJSON.history);
    }
    else{
      alert("Incorrect API KEY");
    }
  });
}
