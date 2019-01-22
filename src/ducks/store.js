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

const sessionStoragePlaylistSongs = localStorage.getItem('playlistSongs')
const playlistSongsValue = (sessionStoragePlaylistSongs && sessionStoragePlaylistSongs !== "undefined") ? JSON.parse(sessionStoragePlaylistSongs) : [];
console.log(playlistSongsValue);

export default createStore(reducer, undefined, applyMiddleware(thunk));
