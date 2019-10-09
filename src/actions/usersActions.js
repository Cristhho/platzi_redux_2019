import axios from 'axios';

import {FETCH_USERS} from '../action-types/usersTypes';

export const fetchAll = () => async (dispatch) => {
	const users = await axios.get("https://jsonplaceholder.typicode.com/users");
	dispatch({
		type: FETCH_USERS,
		payload: users.data
	})
}