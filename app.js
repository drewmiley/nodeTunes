console.log('RUNNING');

var fs = require("fs");
var itunes = require("itunes-data");
var parser = itunes.parser();
var stream = fs.createReadStream("./library.xml");

let noSongs = 0

parser.on("track", function(track) {
    // noSongs++;
    const track1 = {
        album: track['Album'],
        artist: track['Artist'],
        length: track['Total Time'],
        name: track['Name'],
        runningOrder: {
            ...(track['Disc Count'] > 1 && { disc: track['Disc Number'] }),
            number: track['Track Number']
        }
    }
    if (track1.runningOrder.disc) {
        noSongs++;
        console.log("track name:", track1);
    }
    console.log(noSongs);
});

stream.pipe(parser);
