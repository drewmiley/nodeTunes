import * as actiontypes from './actiontypes';

const songsFetchData = params => dispatch => {
    let url = `http://localhost:8000/api/songs/title/${ params.title }?sortBy=${ params.sortBy }`;
    if (params.artist) {
        url += `&artist=${ params.artist }`;
    }
    if (params.album) {
        url += `&album=${ params.album }`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then(response => response.json())
        .then(response => response.results)
        .then(songs => dispatch(songsFetchDataSuccess(songs)));
};

const songsFetchDataSuccess = songs => ({
    type: actiontypes.SONGS_FETCH_DATA_SUCCESS,
    songs
});

const setSongPlayingId = songPlayingId => dispatch => dispatch({ type: actiontypes.SET_SONG_PLAYING_ID, songPlayingId });

const addSongToPlaylist = song => dispatch => dispatch({ type: actiontypes.ADD_SONG_TO_PLAYLIST, song });
const removeSongFromPlaylist = index => dispatch => dispatch({ type: actiontypes.REMOVE_SONG_FROM_PLAYLIST, index });

const setPlaylistSongPlayingIndex = index => dispatch => dispatch({type: actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX, index});

export const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(songsFetchData(url)),
    setSongPlayingId: songPlayingId => dispatch(setSongPlayingId(songPlayingId)),
    addSongToPlaylist: song => dispatch(addSongToPlaylist(song)),
    removeSongFromPlaylist: index => dispatch(removeSongFromPlaylist(index)),
    setPlaylistSongPlayingIndex: i => dispatch(setPlaylistSongPlayingIndex(i))
});
