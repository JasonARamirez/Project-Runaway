var fs = require('fs');
var parse = require('csv-parse');

module.exports = function(file, callback){
    var parser = parse({delimeter:','}, callback);
    fs.createReadStream(file).pipe(parser);
}
