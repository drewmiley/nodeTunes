import * as actiontypes from './actiontypes';
import * as stateupdaters from './stateupdaters';

export const songs = {
    [actiontypes.SONGS_FETCH_DATA_SUCCESS]: stateupdaters.songs
}

export const songPlayingId = {
    [actiontypes.SET_SONG_PLAYING_ID]: stateupdaters.songPlayingId
}

export const playlistSongPlayingIndex = {
    [actiontypes.SET_PLAYLIST_SONG_PLAYING_INDEX]: stateupdaters.playlistSongPlayingIndex
}

export const artists = {
    [actiontypes.ARTISTS_FETCH_DATA_SUCCESS]: stateupdaters.artists
}

export const albums = {
    [actiontypes.ALBUMS_FETCH_DATA_SUCCESS]: stateupdaters.albums
}

export const playlistSongs = {
    [actiontypes.ADD_SONG_TO_PLAYLIST]: stateupdaters.addSongToPlaylist,
    [actiontypes.REMOVE_SONG_FROM_PLAYLIST]: stateupdaters.removeSongFromPlaylist,
    [actiontypes.SET_PLAYLIST]: stateupdaters.setPlaylist
}
