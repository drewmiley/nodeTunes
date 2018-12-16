import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, songPlayingId } from './reducers';

const reducer = combineReducers({
    items,
    hasErrored: itemsHasErrored,
    isLoading: itemsIsLoading,
    songPlayingId
});

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(thunk)
    );
}
