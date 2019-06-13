const setter = property => state => payload => payload[property]

export const songs = setter('songs');
export const songPlayingId = setter('songPlayingId');
export const playlistSongPlayingIndex = setter('index');
export const artists = setter('artists');
export const albums = setter('albums');

// export const playlistSongs = (state = [], action) => {
//     const playlistSongs = ((state, action) => {
//         switch (action.type) {
//             case actiontypes.ADD_SONG_TO_PLAYLIST:
//                 return state.concat([action.payload.song]);
//             case actiontypes.REMOVE_SONG_FROM_PLAYLIST:
//                 return state.filter((_, i) => i !== action.payload.index);
//             case actiontypes.SET_PLAYLIST:
//                 return action.payload.songs;
//             default:
//                 return state;
//         }
//     })(state, action);
//     if (Object.keys(actiontypes).includes(action.type)) {
//         localStorage.setItem('playlistSongs', JSON.stringify(playlistSongs));
//     }
//     return playlistSongs;
// }
