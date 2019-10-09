import {FETCH_USERS} from '../action-types/usersTypes';

const INITIAL_STATE = {
	usuarios: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_USERS:
			return {...state, usuarios: action.payload};
		default:
			return state;
	}
}