var googleMapsKey = 'AIzaSyDGuGmq2m1VZv4oXcddcTaxoqvBlRBZ9AY';

var initMap = function(){
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
}

initAutocomplete = function(){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.09024, lng: -95.712891},
    zoom: 4,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });
  return map;
}

var insertLocations = function(map, markers, locations){
  // Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  
  markers = [];

  locations.forEach(function(location){
    var latlng = location.lat_lng;
    var position = {lat : latlng[0], lng : latlng[1]}
    var title = 'Location: Lat: ' + latlng[0] + ' Lng: ' + latlng[1];
    var infoWindow = new google.maps.InfoWindow({
      content : '<p>' + title + '</p>' +
                '<p>Number of Requests in Progress: ' + location.numInProgress + '</p>' +
                '<p>Number of Requests Completed: ' + location.numCompleted + '</p>' +
                '<p>Number of Requests Canceled: ' + location.numCanceled + '</p>'
    });
    var marker = new google.maps.Marker({
      map: map,
      title: title,
      animation : google.maps.Animation.DROP,
      position: position
    });
    marker.addListener('click', function(){
      infoWindow.open(map, marker);
    });
    // Create a marker for each place.
    markers.push(marker);
  });
  return markers;
}
