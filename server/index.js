const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const getSongFromLibraryTrack = require('./getSongFromLibraryTrack');
const loadLibrary = require('./loadLibrary');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

let songs = [];
loadLibrary().then(libraryTracks => {
    const songMapper = getSongFromLibraryTrack();
    songs = libraryTracks.map(songMapper);
});

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
    return fields.find(field =>!(obj[field] && obj[field].toUpperCase().includes(queryParams[field].toUpperCase()))) === undefined
}

router.get('/loadNewLibrary', (req, res) => {
    loadLibrary(req.query.url).then(libraryTracks => {
        const songMapper = getSongFromLibraryTrack(req.query.url);
        songs = libraryTracks.map(songMapper);
        res.json({ message: `loaded ${ songs.length } songs from ${ req.query.url }` });
    });
});

router.get('/clearLibrary', (req, res) => {
    songs = [];
    res.json({ message: 'library cleared' });
});

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
        .filter(song => song.album && song.album.toUpperCase().includes(req.params.album.toUpperCase()))
        .filter(filterByQueryParams(req.query))
        .sort(albumSortBy(req.query.sortBy || 'songNumber'));
    res.json({ results });
});

router.get('/songs/artist/:artist', (req, res) => {
    // Allowed query params- sortBy, album, title
    // SortBy options- ALBUM, length, title
    const results = songs
        .filter(song => song.artist && song.artist.toUpperCase().includes(req.params.artist.toUpperCase()))
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

router.get('/songs/title/:title?', (req, res) => {
    // Allowed query params- sortBy, album, artist
    // SortBy options- album, artist, length, TITLE
    const results = songs
        .filter(song => !req.params.title || req.params.title === 'null' || (song.title && song.title.toUpperCase().includes(req.params.title.toUpperCase())))
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
        .filter(artist => !req.query.album || artist.albums.find(album => album && album.toUpperCase().includes(req.query.album.toUpperCase())));
    res.json({ results: artists });
});

app.use('/api', router);
app.listen(port);
console.log(`Starting server on port ${ port }`);
