console.log('RUNNING');

// var fs = require("fs");
// var itunes = require("itunes-data");
// var parser = itunes.parser();
// var stream = fs.createReadStream("./library.xml");

// let noSongs = 0

// parser.on("track", function(track) {
//     // noSongs++;
//     const track1 = {
//         album: track['Album'],
//         artist: track['Artist'],
//         length: track['Total Time'],
//         name: track['Name'],
//         runningOrder: {
//             ...(track['Disc Count'] > 1 && { disc: track['Disc Number'] }),
//             number: track['Track Number']
//         }
//     }
//     if (track1.runningOrder.disc) {
//         noSongs++;
//         console.log("track name:", track1);
//     }
//     console.log(noSongs);
// });

// stream.pipe(parser);

// Configure app
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

// API routes
const router = express.Router();

// Middleware
router.use((req, res, next) => {
	console.log('Making request');
	next();
});

router.get('/', (req, res) => {
	res.json({ message: 'nodeTunes is running' });
});

// START THE SERVER
app.use('/api', router);
app.listen(port);
console.log(`Starting server on port ${ port }`);
