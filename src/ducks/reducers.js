export function playlistSongs(state = [], action) {
    switch (action.type) {
        case 'ADD_SONG_TO_PLAYLIST':
            return state.concat([action.song]);
        case 'REMOVE_SONG_FROM_PLAYLIST':
            return state.filter(song => song !== action.song);
        default:
            return state;
    }
}

export function songs(state = [], action) {
    switch (action.type) {
        case 'SONGS_FETCH_DATA_SUCCESS':
            return action.songs;
        default:
            return state;
    }
}

export function songPlayingId(state = null, action) {
    switch (action.type) {
        case 'SET_SONG_PLAYING_ID':
            return action.songPlayingId;
        default:
            return state;
    }
}

export function playlistSongPlayingIndex(state = null, action) {
    switch (action.type) {
        case 'SET_PLAYLIST_SONG_PLAYING_INDEX':
            return action.index;
        default:
            return state;
    }
}
