import * as ActionTypes from './ActionTypes';

import { baseUrl } from '../shared/baseUrl';

export const fetchBooks = () => (dispatch) => {    
    return fetch(baseUrl + 'books')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(books => dispatch(addBooks(books)))
        .catch(error => dispatch(failedBooks(error.message)));
}

export const fetchAuthors = () => (dispatch) => {
    return fetch(baseUrl + 'authors')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(authors => dispatch(addAuthors(authors)))
        .catch(error => dispatch(failedAuthors(error.message)));
}

export const postAuthor = (author) => (dispatch) => {
        
    return fetch(baseUrl + 'authors', {
        method: "POST",
        body: JSON.stringify(author),
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }        
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addAuthor(response)))
    .catch(error =>  { console.log('post authors', error.message); });
};


export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});

export const addAuthors = (authors) => ({
    type: ActionTypes.ADD_AUTHORS,
    payload: authors
});

export const addAuthor = (author) => ({
    type: ActionTypes.ADD_AUTHOR,
    payload: author
});

export const failedBooks = (errmess) => ({
    type: ActionTypes.FAILED_BOOKS,
    payload: errmess
});

export const failedAuthors = (errmess) => ({
    type: ActionTypes.FAILED_AUTHORS,
    payload: errmess
});