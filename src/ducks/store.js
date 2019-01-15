import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { playlistSongs, songs, songPlayingId } from './reducers';

const reducer = combineReducers({
    playlistSongs,
    songs,
    songPlayingId
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
