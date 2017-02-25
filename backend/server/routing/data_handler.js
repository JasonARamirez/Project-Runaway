var decrypt = require('../security/encryption').decryptDataIn;
var sendResponse = require('./send_response');

module.exports = function(req, res, verifyData, processData){
  var requestJSON = decrypt(req);
  if(requestJSON != null){
    verfiyData(requestJSON, function(err){
      if(err == null){
        processData(requestJSON, {func:sendResponse, res:res});
      }
      else{
        sendResponse(true, null, res);
      }
    });
  }
  else{
    sendResponse(true, null, res);
  }
};
