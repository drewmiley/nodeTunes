import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { playlistSongs, songs, songPlayingId, playlistSongPlayingIndex } from './reducers';

const reducer = combineReducers({
    playlistSongs,
    songs,
    songPlayingId,
    playlistSongPlayingIndex
});

const sessionStoragePlaylistSongs = localStorage.getItem('playlistSongs');
const playlistSongsValue = (sessionStoragePlaylistSongs && sessionStoragePlaylistSongs !== "undefined") ? JSON.parse(sessionStoragePlaylistSongs) : [];

export default createStore(reducer, {
    playlistSongs: playlistSongsValue,
    songs: [],
    songPlayingId: null,
    playlistSongPlayingIndex: null
}, applyMiddleware(thunk));
