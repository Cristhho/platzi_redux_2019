import axios from 'axios';

import {FETCH_ALL, CARGANDO, ERROR} from '../action-types/tasksTypes';

export const fetchAll = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		const result = await axios.get("https://jsonplaceholder.typicode.com/todos");

		const tasks = {};
		result.data.map((task) => (
			tasks[task.userId] = {
				...tasks[task.userId],
				[task.id]: {
					...task
				}
			}
		));

		dispatch({
			type: FETCH_ALL,
			payload: tasks
		})
	} catch(error) {
		console.log('[error]', error.message);
		dispatch({
			type: ERROR,
			payload: "Tareas no disponibles."
		})
	}
}