import * as ActionTypes from '../ActionTypes';

import { baseUrl } from '../../shared/baseUrl';

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

export const putAuthor = (author) => (dispatch) => {
        
    return fetch(`${baseUrl}authors/${author.id}`, {
        method: "PUT", 
        body: JSON.stringify(author),
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
    .then(dispatch(updateAuthor(author)))
    .catch(error =>  { console.log('delete author', error.message); });
};

export const deleteAuthor = (author) => (dispatch) => {
        
    return fetch(`${baseUrl}authors/${author.id}`, {method: "DELETE", credentials: "same-origin"})
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
    .then(() => dispatch(removeAuthor(author)))
    .catch(error =>  { console.log('delete author', error.message); });
};

export const addAuthors = (authors) => ({
    type: ActionTypes.ADD_AUTHORS,
    payload: authors
});

export const updateAuthor = (author) => ({
    type: ActionTypes.UPDATE_AUTHOR,
    payload: author
});

export const addAuthor = (author) => ({
    type: ActionTypes.ADD_AUTHOR,
    payload: author
});

export const removeAuthor = (author) => ({
    type: ActionTypes.DELETE_AUTHOR,
    payload: author
});

export const failedAuthors = (errmess) => ({
    type: ActionTypes.FAILED_AUTHORS,
    payload: errmess
});