import axios from 'axios';

import {FETCH_USERS, CARGANDO, ERROR} from '../action-types/usersTypes';

export const fetchAll = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		const users = await axios.get("https://jsonplaceholder.typicode.com/users");
		dispatch({
			type: FETCH_USERS,
			payload: users.data
		})
	} catch(error) {
		console.log('[error]', error.message);
		dispatch({
			type: ERROR,
			payload: "Algio salió mal, intente más tarde."
		})
	}
}