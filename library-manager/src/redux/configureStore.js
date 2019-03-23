import { Books } from './books'
import { Authors } from './authors'
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => { 
    const store = createStore(
        combineReducers({
            books: Books,
            authors: Authors
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}