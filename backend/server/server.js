//server.js is the interface between the client and the rest of the server.
//Current local port will be 8080 running on localhost for testing purposes

var db = require('./database/bookshelf/db_config');
//Express module
var app = require('express')();
//Server module
var http = require('http').Server(app);

var cancelTrip = require('./routing/DELETE/cancel_trip');
app.use('/cancelTrip', cancelTrip);

var login = require('./routing/GET/login');
app.use('/login', login);

var weatherAlongRoute = require('./routing/GET/weather_along_route');
app.use('./weatherAlongRoute', weatherAlongRoute);

var weatherAtLocation = require('./routing/GET/weather_at_location');
app.use('./weatherAtLocation', weatherAtLocation);

var changeStart = require('./routing/PATCH/change_start');
app.use('./changeStart', changeStart);

var completedTrip = require('./routing/PATCH/completed_trip');
app.use('./completedTrip', completedTrip);

var createUser = require('./routing/POST/create_user');
app.use('./createUser', createUser);

var roadTrip = require('./routing/POST/road_trip');
app.use('./roadTrip');

//Start listening on port 8080 on local host
http.listen(process.env.PORT || 8080, function(){
  console.log('listening on *:8080');
});
