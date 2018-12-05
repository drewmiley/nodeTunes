console.log('RUNNING');

var fs = require("fs");
var itunes = require("itunes-data");
var parser = itunes.parser();
var stream = fs.createReadStream("./library.xml");

parser.on("track", function(track) {
    console.log("track:", track);
});

// parser.on("album", function(album) {
//     console.log("album:", album);
// });

// parser.on("artist", function(artist) {
//   console.log("artist:", artist);
// });

stream.pipe(parser);
