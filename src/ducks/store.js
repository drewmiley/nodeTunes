import { combineReducers, createStore, applyMiddleware } from 'redux';
import { anonReducersFromInitialState } from 'redux-anon-reducer';
import thunk from 'redux-thunk';

import * as actionmaps from './actionmaps';

const sessionStoragePlaylistSongs = localStorage.getItem('playlistSongs');
const playlistSongsValue = (sessionStoragePlaylistSongs && sessionStoragePlaylistSongs !== "undefined") ?
    JSON.parse(sessionStoragePlaylistSongs) : [];

const initialState = {
    playlistSongs: playlistSongsValue,
    artists: [],
    albums: [],
    songs: [],
    songPlayingId: null,
    playlistSongPlayingIndex: null
}

const reducer = combineReducers(anonReducersFromInitialState(actionmaps, initialState));

export default createStore(reducer, initialState, applyMiddleware(thunk));
