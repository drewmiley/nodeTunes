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

export default createStore(reducer, undefined, applyMiddleware(thunk));
