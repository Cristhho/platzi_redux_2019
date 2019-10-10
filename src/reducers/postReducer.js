import {FETCH_POSTS, CARGANDO, ERROR} from '../action-types/postTypes';

const INITIAL_STATE = {
	posts: [],
	loading: false,
	error: ""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_POSTS:
			return {...state, posts: action.payload, loading: false, error: ""};
		case CARGANDO:
			return {...state, loading: true}
		case ERROR:
			return {...state, error: action.payload, loading: false}
		default:
			return state;
	}
}