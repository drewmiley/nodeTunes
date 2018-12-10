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

const sortBy = field => (a, b) => (a[field] > b[field]) - (a[field] < b[field]);

const filterByQueryParams = queryParams => obj => {
    const fields = Object.keys(queryParams).filter(field => field !== 'sortBy');
    return fields.find(field =>!(obj[field] && obj[field].includes(queryParams[field]))) === undefined
}

router.get('/songs/album/:album', (req, res) => {
    // Allowed query params- sortBy, artist
    // SortBy options- album, artist, length, SONGNUMBER
    const sortBySongNumber = (a, b) =>
        (a.disc && b.disc && a.disc !== b.disc) ? a.disc - b.disc : a.number - b.number
    const albumSortBy = field => (a, b) =>
        (field !== 'songNumber'
          ? (a[field] > b[field]) - (a[field] < b[field])
          : sortBySongNumber(a.runningOrder, b.runningOrder));
    const results = songs
        .filter(song => song.album && song.album.includes(req.params.album))
        .filter(filterByQueryParams(req.query))
        .sort(albumSortBy(req.query.sortBy || 'songNumber'));
    res.json({ results });
});

router.get('/songs/artist/:artist', (req, res) => {
    // Allowed query params- sortBy, album, title
    // SortBy options- ALBUM, length, title
    const results = songs
        .filter(song => song.artist && song.artist.includes(req.params.artist))
        .filter(filterByQueryParams(req.query))
        .sort(sortBy(req.query.sortBy || 'album'));
    res.json({ results });
});

router.get('/songs/length/min/:min/max/:max', (req, res) => {
    // Allowed query params- sortBy, album, artist
    // SortBy options- album, artist, LENGTH, title
    const results = songs
        .filter(song => song.length && song.length > req.params.min * 1000 && song.length < req.params.max * 1000)
        .filter(filterByQueryParams(req.query))
        .sort(sortBy(req.query.sortBy || 'length'));
    res.json({ results });
});

router.get('/songs/title/:title', (req, res) => {
    // Allowed query params- sortBy, album, artist
    // SortBy options- album, artist, length, TITLE
    const results = songs
        .filter(song => song.title && song.title.includes(req.params.title))
        .filter(filterByQueryParams(req.query))
        .sort(sortBy(req.query.sortBy || 'title'));
    res.json({ results });
});

router.get('/albums', (req, res) => {
    // Allowed query params- sortBy, artist
    // SortBy options- artist, TITLE
    const albums = [...new Set(songs.map(song => song.album))]
        .map(album => {
            const albumSongs = songs.filter(song => song.album === album);
            return {
                title: album,
                artist: albumSongs[0].artist,
                songs: albumSongs.map(song => song.title)
            }
        })
        .filter(filterByQueryParams(req.query))
        .sort(sortBy(req.query.sortBy || 'title'));
    res.json({ results: albums });
});

router.get('/artists', (req, res) => {
    // Allowed query params- album
    const artists = [...new Set(songs.map(song => song.artist))]
        .map(artist => {
            const artistSongs = songs.filter(song => song.artist === artist);
            return {
                name: artist,
                albums: [...new Set(artistSongs.map(song => song.album))]
            }
        })
        .filter(artist => !req.query.album || artist.albums.find(album => album && album.includes(req.query.album)));
    res.json({ results: artists });
});

app.use('/api', router);
app.listen(port);
console.log(`Starting server on port ${ port }`);
