var saveHistory = require('../database/database').insert.history;
var encryptDataOut = require('../security/encryption').encryptDataOut;
module.exports = function(err, response, history, res){
    if(err == null){
        res.send(encryptDataOut(response));
        if(history){
          saveHistory(history, true);
        }
    }
    else {
        res.send(JSON.stringify({success : 0}));
        if(history){
          saveHistory(history, false);
        }
    }
    console.log('Sent');
};
