import * as actiontypes from './actiontypes';

const fetchAction = (actionType, property) => data => ({
    type: actionType,
    [property]: data
});

const fetchData = (url, action) => dispatch => {
    fetch(url)
        .then(response => response.json())
        .then(response => response.results)
        .then(results => dispatch(action(results)));
}

const fetchSongs = params => dispatch => {
    let url = `${ process.env.API_URL }/api/songs/title/${ params.title }?sortBy=${ params.sortBy }`;
    if (params.artist) { url += `&artist=${ params.artist }`; };
    if (params.album) { url += `&album=${ params.album }`; };

    const songsFetchDataSuccess = fetchAction(actiontypes.SONGS_FETCH_DATA_SUCCESS, 'songs');
    const fetchSongs = fetchData(url, songsFetchDataSuccess);
    dispatch(fetchSongs);
};

const fetchArtists = () => dispatch => {
    const artistsFetchDataSuccess = fetchAction(actiontypes.ARTISTS_FETCH_DATA_SUCCESS, 'artists');
    const fetchArtists = fetchData(`${ process.env.API_URL }/api/artists`, artistsFetchDataSuccess);
    dispatch(fetchArtists);
};

const fetchAlbums = () => dispatch => {
    const albumsFetchDataSuccess = fetchAction(actiontypes.ALBUMS_FETCH_DATA_SUCCESS, 'albums');
    const fetchAlbums = fetchData(`${ process.env.API_URL }/api/albums`, albumsFetchDataSuccess);
    dispatch(fetchAlbums);
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
