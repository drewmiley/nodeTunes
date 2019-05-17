import * as actiontypes from './actiontypes';

export function playlistSongs(state = [], action) {
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

export function songs(state = [], action) {
    switch (action.type) {
        case actiontypes.SONGS_FETCH_DATA_SUCCESS:
            return action.songs;
        default:
            return state;
    }
}

export function songPlayingId(state = null, action) {
    switch (action.type) {
        case actiontypes.SET_SONG_PLAYING_ID:
            return action.songPlayingId;
        default:
            return state;
    }
}

export function playlistSongPlayingIndex(state = null, action) {
    switch (action.type) {
        case actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX:
            return action.index;
        default:
            return state;
    }
}

export function artists(state = [], action) {
    switch (action.type) {
        case actiontypes.ARTISTS_FETCH_DATA_SUCCESS:
            return action.artists;
        default:
            return state;
    }
}

export function albums(state = [], action) {
    switch (action.type) {
        case actiontypes.ALBUMS_FETCH_DATA_SUCCESS:
            return action.albums;
        default:
            return state;
    }
}
