import axios from 'axios';

import {FETCH_ALL, CARGANDO, ERROR,
	CHANGE_USER_ID, CHANGE_TITLE, TASK_ADDED} from '../action-types/tasksTypes';

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

export const changeUserId = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_USER_ID,
		payload: value
	});
}

export const changeTitle = (value) => (dispatch) => {
	dispatch({
		type: CHANGE_TITLE,
		payload: value
	});
}

export const add = (task) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', task);
		dispatch({
			type: TASK_ADDED
		})
	} catch(e) {
		console.error(e);
		dispatch({
			type: ERROR,
			payload: "Intente mas tarde."
		})
	}
}

export const edit = (task) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});
	try {
		const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
		dispatch({
			type: TASK_ADDED
		})
	} catch(e) {
		console.error(e);
		dispatch({
			type: ERROR,
			payload: "Intente mas tarde."
		})
	}
}