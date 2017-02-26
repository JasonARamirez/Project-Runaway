//Encrytption will hold all functions used to encrypt data coming to and from
//the client or database
module.exports = {
    encryptDataOut : function(message){
        try{
            var JSONString = JSON.stringify(message);
            console.log('Sending: ' + JSONString);
            return JSONString;
        }catch(err){
            console.log("Incorrect JavaScript Object");
            return null;
        }
    },

    decryptDataIn : function(message){
        try{
            console.log(message.query);
            var requestObject = JSON.parse(message.query.request);
            return requestObject;
        }catch(err){
            console.log("Parsing incorrect: " + err.message);
            return null;
        }
    }
}
