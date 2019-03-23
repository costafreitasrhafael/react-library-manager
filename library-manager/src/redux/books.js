import * as ActionTypes from './ActionTypes';

export const Books = (state = { errMess: null, books:[]}, action) => {
            
    switch (action.type) {
        case ActionTypes.ADD_BOOKS:
            return {...state, errMess: null, books: action.payload};

        case ActionTypes.FAILED_BOOKS:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_BOOK:
            return {...state, books: state.books.concat(action.payload)};

        case ActionTypes.UPDATE_BOOK:
            var array = [...state.books];
            var index = array.map(function(d){ return d.id;}).indexOf(action.payload.id);

            if (index !== -1) {
                array[index] = action.payload;                
            }
            return {...state, books: array};

        case ActionTypes.DELETE_BOOK:            
            var array = [...state.books]; 
            var index = array.indexOf(action.payload)
            if (index !== -1) {
              array.splice(index, 1);
            }

            return {...state, books: array};

        default:
            return state;
    }
};