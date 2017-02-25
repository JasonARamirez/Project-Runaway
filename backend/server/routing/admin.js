var db = require('./database/bookshelf/db_config');
//Express module
var app = require('express')();
//Server module
var http = require('http').Server(app);

var user = require('./routing/generic_user');
app.use('/user', user);

var shopper = require('./routing/shopper');
app.use('/shop', shopper);

var requester = require('./routing/requester');
app.use('/request', requester);

var admin = require('./routing/Admin');
app.use('/admin', admin);

//Start listening on port 8080 on local host
http.listen(process.env.PORT || 8080, function(){
  console.log('listening on *:8080');
});
