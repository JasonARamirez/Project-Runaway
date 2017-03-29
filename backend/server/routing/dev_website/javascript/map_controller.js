app.controller('map_controller',function($scope, $location){
  $scope.choices = [
    {
      text : 'Start Locations',
      on : true,
      isStart : true
    },
    {
      text : 'End Locations',
      on : false,
      isStart : false
    }
  ]
  $scope.init = function(){
    $(document).ready(function(){
      $scope.map = initAutocomplete();
      $scope.markers = [];
      $scope.resetMap(1);
    });
  }
  $scope.resetMap = function(isStart){
    console.log($scope.choices[0].on);
    console.log($scope.choices[1].on);
    if($scope.choices[0].on == true){
      $scope.choices[0].on == false;
      $scope.choices[1].on == true;
    }
    else{
      $scope.choices[1].on == false;
      $scope.choices[0].on == true;
    }
    retrieveStartEnd(function(routes){
      var markerData = createMarkerData(routes, isStart);
      $scope.markers = insertLocations($scope.map, $scope.markers, markerData);
      $scope.map
    });
  }
});

var retrieveStartEnd = function(callback){
  var data = {
    request : JSON.stringify({userID : sessionStorage.getItem('key')})
  }
  $.get('allTripsStartEndData', data, function(dataReturned, status){
    var dataJSON = JSON.parse(dataReturned);
    if(dataJSON.success == 1){
      callback(dataJSON.routes);
    }
    else{
      alert("Incorrect API KEY");
    }
  });
}

var createMarkerData = function(routes, isStart){
  var markersData = [];
  var lastMarkerData = null;
  var getLocation = null;
  if(isStart){
    console.log('Getting Start');
    getLocation = function(route){
      return route.start;
    }
  }
  else{
    console.log('Getting End');
    getLocation = function(route){
      return route.end;
    }
  }

  routes.forEach(function(route){
    var location = getLocation(route);
    if(lastMarkerData == null){
      lastMarkerData = new MarkerData(location);
      lastMarkerData.addToMarker(route);
      markersData.push(lastMarkerData);
    }
    else{
      if(lastMarkerData.sameLocation(location)){
        lastMarkerData.addToMarker(route);
      }
      else{
        lastMarkerData = new MarkerData(location);
        lastMarkerData.addToMarker(route);
        markersData.push(lastMarkerData);
      }
    }
  });
  return markersData;
}

function MarkerData(lat_lng){
  this.lat_lng = lat_lng;
  this.numInProgress = 0;
  this.numCompleted = 0;
  this.numCanceled = 0;

  this.addToMarker = function(route){
    if(route.canceled == 1){
      this.numCanceled++;
    }
    else if(route.completed == 1){
      this.numCompleted++;
    }
    else{
      this.numInProgress++;
    }
  }
  this.sameLocation = function(location){
    return this.sameFloat(lat_lng[0], location[0]) && this.sameFloat(lat_lng[1], location[1]);
  }

  this.sameFloat = function(a, b){
    return Math.abs(a - b) < Number.EPSILON;
  }
}
