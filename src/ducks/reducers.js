import * as actiontypes from './actiontypes';

export const playlistSongs = (state = [], action) => {
    const playlistSongs = ((state, action) => {
        switch (action.type) {
            case actiontypes.ADD_SONG_TO_PLAYLIST:
                return state.concat([action.payload.song]);
            case actiontypes.REMOVE_SONG_FROM_PLAYLIST:
                return state.filter((_, i) => i !== action.payload.index);
            case actiontypes.SET_PLAYLIST:
                return action.payload.songs;
            default:
                return state;
        }
    })(state, action);
    return playlistSongs;
}
