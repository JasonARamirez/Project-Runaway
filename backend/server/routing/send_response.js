var encryptDataOut = require('../security/encryption').encryptDataOut;
module.exports = function(err, response, res){
    if(err == null){
        res.send(encryptDataOut(response));
    }
    else {
        res.send(JSON.stringify({success : 0}));
    }
    console.log('Sent');
};
