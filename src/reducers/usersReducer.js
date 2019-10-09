import {FETCH_USERS, CARGANDO, ERROR} from '../action-types/usersTypes';

const INITIAL_STATE = {
	usuarios: [],
	loading: false,
	error: ""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USERS:
			return {...state, usuarios: action.payload, loading: false};
		case CARGANDO:
			return {...state, loading: true}
		case ERROR:
			return {...state, error: action.payload, loading: false}
		default:
			return state;
	}
}