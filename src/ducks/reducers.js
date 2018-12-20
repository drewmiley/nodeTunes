export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
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
