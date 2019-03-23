import * as ActionTypes from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

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

export const postBook = (book) => (dispatch) => {
        
    return fetch(baseUrl + 'books', {
        method: "POST",
        body: JSON.stringify(book),
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
    .then(response => dispatch(addBook(response)))
    .catch(error =>  { console.log('post books', error.message); });
};

export const putBook = (book) => (dispatch) => {
        
    return fetch(`${baseUrl}books/${book.id}`, {
        method: "PUT", 
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
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
    .then(dispatch(updateBook(book)))
    .catch(error =>  { console.log('delete book', error.message); });
};

export const deleteBook = (book) => (dispatch) => {
        
    return fetch(`${baseUrl}books/${book.id}`, {method: "DELETE", credentials: "same-origin"})
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
    .then(() => dispatch(removeBook(book)))
    .catch(error =>  { console.log('delete book', error.message); });
};

export const addBooks = (books) => ({
    type: ActionTypes.ADD_BOOKS,
    payload: books
});

export const addBook = (book) => ({
    type: ActionTypes.ADD_BOOK,
    payload: book
});

export const updateBook = (book) => ({
    type: ActionTypes.UPDATE_BOOK,
    payload: book
});

export const removeBook = (book) => ({
    type: ActionTypes.DELETE_BOOK,
    payload: book
});

export const failedBooks = (errmess) => ({
    type: ActionTypes.FAILED_BOOKS,
    payload: errmess
});