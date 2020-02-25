import {UPDATE_POSTS, CARGANDO, ERROR,
	UPDATE_COMMENTS, CARGANDO_COMENTARIOS, ERROR_COMENTARIOS} from '../action-types/postTypes';

const INITIAL_STATE = {
	posts: [],
	loading: false,
	error: "",
	loading_comments: false,
	comments_error: ""
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_POSTS:
			return {...state, posts: action.payload, loading: false, error: ""};
		case CARGANDO:
			return {...state, loading: true}
		case ERROR:
			return {...state, error: action.payload, loading: false}
		case UPDATE_COMMENTS:
			return {...state, posts: action.payload, loading_comments: false, comments_error: ""};
		case CARGANDO_COMENTARIOS:
			return {...state, loading_comments: true}
		case ERROR_COMENTARIOS:
			return {...state, comments_error: action.payload, loading_comments: false}
		default:
			return state;
	}
}