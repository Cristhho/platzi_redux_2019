import {combineReducers} from 'redux';
import usersReducer from './usersReducer';
import postReducer from './postReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
	usersReducer,
	postReducer,
	tasksReducer
});