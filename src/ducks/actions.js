import * as actiontypes from './actiontypes';

const fetchSongs = params => dispatch => {
    const songsFetchDataSuccess = songs => ({
        type: actiontypes.SONGS_FETCH_DATA_SUCCESS,
        songs
    });

    let url = `${ process.env.API_URL }/api/songs/title/${ params.title }?sortBy=${ params.sortBy }`;
    if (params.artist) { url += `&artist=${ params.artist }`; };
    if (params.album) { url += `&album=${ params.album }`; };

    fetch(url)
        .then(response => response.json())
        .then(response => response.results)
        .then(songs => dispatch(songsFetchDataSuccess(songs)));
};

const fetchArtists = () => dispatch => {
    const artistsFetchDataSuccess = artists => ({
        type: actiontypes.ARTISTS_FETCH_DATA_SUCCESS,
        artists
    });
    fetch(`${ process.env.API_URL }/api/artists`)
        .then(response => response.json())
        .then(response => response.results.map(artist => artist.name))
        .then(artists => dispatch(artistsFetchDataSuccess(artists)));
};

const fetchAlbums = () => dispatch => {
    const albumsFetchDataSuccess = albums => ({
        type: actiontypes.ALBUMS_FETCH_DATA_SUCCESS,
        albums
    });
    fetch(`${ process.env.API_URL }/api/albums`)
        .then(response => response.json())
        .then(response => response.results.map(album => album.title))
        .then(albums => dispatch(albumsFetchDataSuccess(albums)));
};

const setSongPlayingId = songPlayingId => dispatch => dispatch({ type: actiontypes.SET_SONG_PLAYING_ID, songPlayingId });

const addSongToPlaylist = song => dispatch => dispatch({ type: actiontypes.ADD_SONG_TO_PLAYLIST, song });
const removeSongFromPlaylist = index => dispatch => dispatch({ type: actiontypes.REMOVE_SONG_FROM_PLAYLIST, index });

const setPlaylistSongPlayingIndex = index => dispatch => dispatch({type: actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX, index});

const setPlaylist = songs => dispatch => dispatch({type: actiontypes.SET_PLAYLIST, songs});

export const mapDispatchToProps = dispatch => ({
    fetchData: params => dispatch(fetchSongs(params)),
    setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId)),
    addSongToPlaylist: song => dispatch(addSongToPlaylist(song)),
    removeSongFromPlaylist: index => dispatch(removeSongFromPlaylist(index)),
    setPlaylistSongPlayingIndex: i => dispatch(setPlaylistSongPlayingIndex(i)),
    setPlaylist: songs => dispatch(setPlaylist(songs)),
    fetchArtists: () => dispatch(fetchArtists()),
    fetchAlbums: () => dispatch(fetchAlbums())
});
