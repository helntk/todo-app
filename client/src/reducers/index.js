import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import taskReducer from './taskReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    tasks: taskReducer
})