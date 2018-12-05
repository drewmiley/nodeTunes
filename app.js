const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

const fs = require("fs");
const itunes = require("itunes-data");
const parser = itunes.parser();
const stream = fs.createReadStream("./library.xml");

let noSongs = 0

parser.on("track", track => {
    // noSongs++;
    const song = {
        album: track['Album'],
        artist: track['Artist'],
        length: track['Total Time'],
        runningOrder: {
            ...(track['Disc Count'] > 1 && { disc: track['Disc Number'] }),
            number: track['Track Number']
        },
        title: track['Name']
    }
      noSongs++;
      console.log("song:", song);
});

stream.pipe(parser);

const router = express.Router();
router.use((req, res, next) => {
    console.log('Making request');
    next();
});

router.get('/', (req, res) => {
    console.log(noSongs);
    res.json({ message: 'nodeTunes is running' });
});

router.get('/album/:album', (req, res) => {
    console.log(req.params.album);
    console.log(req.query);
    res.json({ message: 'get by album' });
});

router.get('/artist/:artist', (req, res) => {
    console.log(req.params.artist);
    console.log(req.query);
    res.json({ message: 'get by artist' });
});

router.get('/length/min/:min/max/:max', (req, res) => {
    console.log(req.params.min);
    console.log(req.params.max);
    console.log(req.query);
    res.json({ message: 'get by length' });
});

router.get('/title/:title', (req, res) => {
    console.log(req.params.title);
    console.log(req.query);
	  res.json({ message: 'get by title' });
});

app.use('/api', router);
app.listen(port);
console.log(`Starting server on port ${ port }`);
