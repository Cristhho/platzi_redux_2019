import axios from 'axios';

import {FETCH_POSTS, GET_USER_POSTS, CARGANDO, ERROR} from '../action-types/postTypes';
import * as userTypes from '../action-types/usersTypes';

const {FETCH_USERS: FETCH_ALL_USERS} = userTypes;

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

export const getUserPosts = (key) => async (dispatch, getState) => {
	const {posts} = getState().postReducer;
	const {usuarios} = getState().usersReducer;
	const user_id = usuarios[key].id;
	const user_posts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
	const updated_posts = [...posts, user_posts.data];

	const posts_key = updated_posts.length - 1;
	const updated_users = [...usuarios];
	updated_users[key] = {
		...usuarios[key],
		posts_key
	};

	dispatch({
		type: FETCH_ALL_USERS,
		payload: updated_users
	});

	dispatch({
		type: GET_USER_POSTS,
		payload: updated_posts
	})
};