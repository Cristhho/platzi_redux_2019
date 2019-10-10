import {combineReducers} from 'redux';
import usersReducer from './usersReducer';
import postReducer from './postReducer';

export default combineReducers({
	usersReducer,
	postReducer
});