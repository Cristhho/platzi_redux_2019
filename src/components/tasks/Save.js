import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import * as tasksActions from '../../actions/tasksActions';

class Save extends Component {

	changeUserId = (event) => {
		this.props.changeUserId(event.target.value);
	};
	changeTitle = (event) => {
		this.props.changeTitle(event.target.value);
	};

	save = () => {
		const {user_id, title, add} = this.props;
		const newTask = {
			userId: user_id,
			title,
			completed: false
		};

		add(newTask);
	};

	disable = () => {
		const {user_id, title, loading} = this.props;

		if(loading) return true;
		if(!user_id || !title) return true;

		return false;
	}

	showActions = () => {
		const {loading, error} = this.props;

		if(loading) return <Spinner />;
		if(error) return <Fatal message={error} />;
	}

	render() {
		return (
			<div>
				{
					(this.props.goBack) ? <Redirect to='/tasks' /> : ''
				}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input type='number' value={this.props.user_id} onChange={this.changeUserId} />
				<br /><br />
				Título:
				<input value={this.props.title} onChange={this.changeTitle} />
				<br /><br />
				<button onClick={this.save} disabled={this.disable()}>
					Guardar
				</button>
				{this.showActions()}
			</div>
		);
	}
}

const mapStateToProps = ({tasksReducer}) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Save);