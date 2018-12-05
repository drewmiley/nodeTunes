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

let songs = []

parser.on("track", track => {
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
    songs.push(song);
});

stream.pipe(parser);

const router = express.Router();
router.use((req, res, next) => {
    console.log('Making request');
    next();
});

router.get('/', (req, res) => {
    console.log(songs.length);
    res.json({ message: 'nodeTunes is running' });
});

router.get('/album/:album', (req, res) => {
  // Allowed query params- sortBy, artist
  // SortBy options- album, artist, length, SONGNUMBER
    const results = songs
        .filter(song => song.album && song.album.includes(req.params.album));
    console.log(req.params.album);
    console.log(req.query);
    res.json({ results });
});

router.get('/artist/:artist', (req, res) => {
  // Allowed query params- sortBy, album, title
  // SortBy options- ALBUM, length, title
    const results = songs
        .filter(song => song.artist && song.artist.includes(req.params.artist));
    console.log(req.params.artist);
    console.log(req.query);
    res.json({ results });
});

router.get('/length/min/:min/max/:max', (req, res) => {
  // Allowed query params- sortBy, album, artist
  // SortBy options- album, artist, LENGTH, title
    const results = songs
        .filter(song => song.length && song.length > req.params.min * 1000 && song.length < req.params.max * 1000);
    console.log(req.params.min);
    console.log(req.params.max);
    console.log(req.query);
    res.json({ results });
});

router.get('/title/:title', (req, res) => {
  // Allowed query params- sortBy, album, artist
  // SortBy options- album, artist, length, TITLE
    const results = songs
        .filter(song => song.title && song.title.includes(req.params.title));
    console.log(req.params.title);
    console.log(req.query);
    res.json({ results });
});

app.use('/api', router);
app.listen(port);
console.log(`Starting server on port ${ port }`);
