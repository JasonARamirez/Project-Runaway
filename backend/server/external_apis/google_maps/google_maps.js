var GoogleMapsAPI = require('googlemaps');

var publicConfig = {
  key: 'AIzaSyDEaX0V5IP1RXC0OWAjeGIFM5ZyoVp1p74',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
};

var gmAPI = new GoogleMapsAPI(publicConfig);

module.exports = gmAPI;
