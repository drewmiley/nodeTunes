import * as actiontypes from './actiontypes';

const setter = (defaultState, actionType, actionProperty) =>
    (state = defaultState, action) =>
    action.type === actionType ? action[actionProperty] : state;

export const playlistSongs = (state = [], action) => {
    const playlistSongs = ((state, action) => {
        switch (action.type) {
            case actiontypes.ADD_SONG_TO_PLAYLIST:
                return state.concat([action.song]);
            case actiontypes.REMOVE_SONG_FROM_PLAYLIST:
                return state.filter((_, i) => i !== action.index);
            case actiontypes.SET_PLAYLIST:
                return action.songs;
            default:
                return state;
        }
    })(state, action);
    if (Object.keys(actiontypes).includes(action.type)) {
        localStorage.setItem('playlistSongs', JSON.stringify(playlistSongs));
    }
    return playlistSongs;
}

export const songs = setter([], actiontypes.SONGS_FETCH_DATA_SUCCESS, 'songs');
export const songPlayingId = setter(null, actiontypes.SET_SONG_PLAYING_ID, 'songPlayingId');
export const playlistSongPlayingIndex = setter(null, actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX, 'index');
export const artists = setter([], actiontypes.ARTISTS_FETCH_DATA_SUCCESS, 'artists');
export const albums = setter([], actiontypes.ALBUMS_FETCH_DATA_SUCCESS, 'albums');
