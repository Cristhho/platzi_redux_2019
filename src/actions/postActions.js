import axios from 'axios';

import {FETCH_POSTS, GET_USER_POSTS, CARGANDO, ERROR} from '../action-types/postTypes';

export const fetchAll = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
		dispatch({
			type: FETCH_POSTS,
			payload: posts.data
		})
	} catch(error) {
		console.log('[error]', error.message);
		dispatch({
			type: ERROR,
			payload: "Algio salió mal, intente más tarde."
		})
	}
};

export const getUserPosts = (user_id) => async (dispatch, getState) => {
	const {posts} = getState().postReducer;
	const user_posts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
	const updated_posts = [...posts, user_posts.data];

	dispatch({
		type: GET_USER_POSTS,
		payload: updated_posts
	})
};