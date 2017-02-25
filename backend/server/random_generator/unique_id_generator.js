var db = require('../database/database');
var async = require('async');

module.exports = {
        //Takes the time and day along with a "Table character" to create a uniqueID
        //Generates a unique userID
        generateUserID : function(callback){
            var userIDExists = true;
            var newUserID = '';

            async.whilst(
              function () { return userIDExists; },
              function (callback) {
                newUserID = generateGenericID('U');
                db.retrieve.users.isUserID(newUserID, function(err, doesUserExist){
                  if(!err){
                    userIDExists = doesUserExist;
                  }
                  callback();
                });
              },
              function (err) {
                callback(err, newUserID);
              }
            );
        },

        //Generates a unique listID
        generateRouteID : function(callback){
          var listIDExists = true;
          var newListID = '';

          async.whilst(
            function () { return listIDExists; },
            function (callback) {
              newRouteID = generateGenericID('R');
              db.retrieve.routes.isRouteID(newRouteID, function(err, doesRouteExist){
                if(!err){
                  routeIDExists = doesRouteExist;
                }
                callback();
              });
            },
            function (err) {
              callback(err, newRouteID);
            }
          );
        }
};

var generateGenericID = function(tableType){
    var d = new Date().getTime();
    var uuid = ('xxxxxxxx-xxxx-'+ tableType +'xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
