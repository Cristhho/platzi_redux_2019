import {FETCH_ALL, CARGANDO, ERROR,
	CHANGE_USER_ID, CHANGE_TITLE, TASK_ADDED} from '../action-types/tasksTypes';

const INITIAL_STATE = {
	tasks: {},
	loading: false,
	error: "",
	user_id: '',
	title: '',
	goBack: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, tasks: action.payload, loading: false, error: "", goBack: false};
		case CARGANDO:
			return {...state, loading: true}
		case ERROR:
			return {...state, error: action.payload, loading: false}
		case CHANGE_USER_ID:
			return {...state, user_id: action.payload}
		case CHANGE_TITLE:
			return {...state, title: action.payload}
		case TASK_ADDED:
			return {...state, tasks: {}, loading: false, error: "", goBack: true, user_id: '', title: ''}
		default:
			return state;
	}
}