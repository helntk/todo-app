import {GET_TASKS,LOADING_TASKS} from '../actions/types';
const initialState = {
    tasks: [],
    loading: false,
}

export default  function taskReducer(state = initialState, action){
      switch (action.type) {
          case GET_TASKS:
              return {
                  ...state,
                   tasks: action.payload,
                   loading: false
                }
                case LOADING_TASKS:
                 return {
                    ...state,
                     loading: true
                }
                
          default:
            return state;
      }
}