module.exports = function(err, response, res){
    if(err == null){
        res.send(encryption.encryptDataOut(response));
    }
    else {
        res.send(JSON.stringify({success : 0}));
    }
};
