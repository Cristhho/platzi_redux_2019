import axios from 'axios';

import {FETCH_POSTS, CARGANDO, ERROR} from '../action-types/postTypes';

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

export const getUserPosts = (user_id) => async (dispatch) => {
	const posts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
	dispatch({
		type: FETCH_POSTS,
		payload: posts.data
	})
};