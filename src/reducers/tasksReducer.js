import {FETCH_ALL, CARGANDO, ERROR} from '../action-types/tasksTypes';

const INITIAL_STATE = {
	tasks: {},
	loading: false,
	error: ""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ALL:
			return {...state, tasks: action.payload, loading: false, error: ""};
		case CARGANDO:
			return {...state, loading: true}
		case ERROR:
			return {...state, error: action.payload, loading: false}
		default:
			return state;
	}
}