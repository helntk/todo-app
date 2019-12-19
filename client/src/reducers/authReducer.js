import {GET_SELECTED_USER} from '../actions/types';
import isEmpty from '../utils/isEmpty'
const initialState = {
    authenticated: false,
    user: {}
}

export default function authReducer(state = initialState,action){
    switch (action.type) {  
        case GET_SELECTED_USER:
            return {
             ...state,
             authenticated:!isEmpty(action.payload),
             user: action.payload
            }
        default:
            return state;
    }
}