import axios from 'axios';

import {FETCH_POSTS, UPDATE_POSTS, CARGANDO, ERROR} from '../action-types/postTypes';
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

	dispatch({
		type: CARGANDO
	});

	const {posts} = getState().postReducer;
	const {usuarios} = getState().usersReducer;
	const user_id = usuarios[key].id;
	try{
		const user_posts = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

		const new_posts = user_posts.data.map((post) => ({
			...post,
			comments: [],
			open: false
		}));

		const updated_posts = [...posts, new_posts];

		dispatch({
			type: UPDATE_POSTS,
			payload: updated_posts
		})

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
	} catch(error) {
		console.log('[error]', error.message);
		dispatch({
			type: ERROR,
			payload: "Publicaciones no disponibles."
		})
	}
};

export const openClose = (posts_key, index) => (dispatch, getState) => {
	const {posts} = getState().postReducer;
	const selected = posts[posts_key][index];

	const updated = {
		...selected,
		open: !selected.open
	};

	const updated_posts = [...posts];
	updated_posts[posts_key] = [
	...updated_posts[posts_key]
	];
	updated_posts[posts_key][index] = updated;

	dispatch({
		type: UPDATE_POSTS,
		payload: updated_posts
	})
}

export const getComments = (posts_key, index) => async (dispatch, getState) => {
	const {posts} = getState().postReducer;
	const selected = posts[posts_key][index];

	const post_comments = await axios.get(
		`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`);
	const updated = {
		...selected,
		comments: post_comments.data
	};

	const updated_posts = [...posts];
	updated_posts[posts_key] = [
	...updated_posts[posts_key]
	];
	updated_posts[posts_key][index] = updated;

	dispatch({
		type: UPDATE_POSTS,
		payload: updated_posts
	})
}