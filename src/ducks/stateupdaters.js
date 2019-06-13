const setter = actionProperty => (state = defaultState, action) => action.payload[actionProperty];

export const songs = setter('songs');
export const songPlayingId = setter('songPlayingId');
export const playlistSongPlayingIndex = setter('index');
export const artists = setter('artists');
export const albums = setter('albums');
