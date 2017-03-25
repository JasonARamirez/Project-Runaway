app.controller('map_controller',function($scope, $location){
  $(document).ready(function(){
    initAutocomplete([{lat_lng : [42.031692, -93.638341], numInProgress : 100, numCompleted : 1500, numCanceled : 168}]);
  });
});
