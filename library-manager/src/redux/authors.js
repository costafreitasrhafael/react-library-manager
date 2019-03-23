import * as ActionTypes from './ActionTypes';

export const Authors = (state = { errMess: null, authors:[] }, action) => {
            
    switch (action.type) {
        case ActionTypes.ADD_AUTHORS:
            return {...state, errMess: null, authors: action.payload};

        case ActionTypes.FAILED_AUTHORS:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_AUTHOR:
            return {...state, authors: state.authors.concat(action.payload)};

        case ActionTypes.UPDATE_AUTHOR:
            var array = [...state.authors];
            var index = array.map(function(d){ return d.id;}).indexOf(action.payload.id);

            if (index !== -1) {
                array[index] = action.payload;                
            }
            return {...state, authors: array};

        case ActionTypes.DELETE_AUTHOR:            
            var array = [...state.authors]; // make a separate copy of the array
            var index = array.indexOf(action.payload)
            if (index !== -1) {
              array.splice(index, 1);
            }

            return {...state, authors: array};

        default:
            return state;
    }
};