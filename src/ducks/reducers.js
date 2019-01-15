export function playlistSongs(state = [], action) {
    switch (action.type) {
        case 'ADD_SONG_TO_PLAYLIST':
            return [action.song];
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
