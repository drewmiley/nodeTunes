const setter = property => state => payload => payload[property]

export const songs = setter('songs');
export const songPlayingId = setter('songPlayingId');
export const playlistSongPlayingIndex = setter('index');
export const artists = setter('artists');
export const albums = setter('albums');

export const addSongToPlaylist = state => ({ song }) => state.concat([song]);
export const removeSongFromPlaylist = state => ({ index }) => state.filter((_, i) => i !== index);
export const setPlaylist = state => ({ songs }) => songs;
