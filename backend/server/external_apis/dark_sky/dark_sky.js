'use strict';
const DarkSky = require('dark-sky')
const forecast = new DarkSky('7fac34997f7ef8f5d3867514a57b71b0')

forecast
    .latitude('37.8267')            \\ required: latitude, string.
    .longitude('-122.423')          \\ required: longitude, string.
    .time('2016-01-28')             \\ optional: date, string 'YYYY-MM-DD'.
    .units('ca')                    \\ optional: units, string, refer to API documentation.
    .language('en')                 \\ optional: language, string, refer to API documentation.
    .exclude('minutely,daily')      \\ optional: exclude, string, refer to API documentation.
    .extendHourly(true)             \\ optional: extend, boolean, refer to API documentation.
    .get()                          \\ execute your get request.
    .then(res => {                  \\ handle your success response.
        console.log(res)
    })
    .catch(err => {                 \\ handle your error response.
        console.log(err)
    })




/*
var DarkSkyPI = require('darksky');
var host = 'api.darksky.net';
var apiKey = '7fac34997f7ef8f5d3867514a57b71b0';

var forecastRequest = function(latitude, longitude, callback)
{
  var endpoint = '/v1/forecast?' + 'apiKey=' + apiKey + '&long=' + longitude + '&lat=' + lat;
  var options =
  {
    host: host,
    path: endpoint,
    method: 'GET'
  };

  var req = https.request(options, functions(res)
  {
    res.setEncoding('utf-8');
    var response = '';

    res.on('data', function(data)
    {
      response += data;
    });

    res.on('end', funciton()
    {
      var responseObj = JSON.parse(response);
      var currentConditions = responseObj.currently;
      callback(null, responseObj);
    });
  });
  req.end();
}


*/
