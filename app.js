console.log('RUNNING');

var fs = require("fs");
var itunes = require("itunes-data");
var parser = itunes.parser();
var stream = fs.createReadStream("./library.xml");

let noSongs = 0

parser.on("track", function(track) {
  noSongs++;
    console.log("track:", track);
    console.log(noSongs);
});

stream.pipe(parser);
