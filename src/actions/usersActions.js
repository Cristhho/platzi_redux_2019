import axios from 'axios';

export const fetchAll = () => async (dispatch) => {
	const users = await axios.get("https://jsonplaceholder.typicode.com/users");
	dispatch({
		type: 'fetch_users',
		payload: users.data
	})
}