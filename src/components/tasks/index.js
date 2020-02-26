import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import * as tasksActions from '../../actions/tasksActions';

class Tasks extends Component {

	componentDidMount() {
		if(!Object.keys(this.props.tasks).length) this.props.fetchAll();
	}

	componentDidUpdate(prevProps, prevState) {
		const {tasks, loading, fetchAll} = this.props;
		if(!Object.keys(tasks).length && !loading) fetchAll();
	}

	showContent = () => {
		const {tasks, loading, error} = this.props;
		if(loading) return <Spinner />;
		if(error) return <Fatal message={error} />;
		return Object.keys(tasks).map((userId) => (
			<div key={userId}>
				<h2>{userId}</h2>
				<div className="tasks_wrapper">
					{this.showTasks(userId)}
				</div>
			</div>
		));
	}

	showTasks = (userId) => {
		const {tasks, deleteTask} = this.props;
		const byUser = {
			...tasks[userId]
		};

		return Object.keys(byUser).map((task) => (
			<div key={task}>
				<input type='checkbox' defaultChecked={byUser[task].completed}/>
				{
					byUser[task].title
				}
				<button className="m_left"><Link to={`/tasks/save/${userId}/${task}`}>Editar</Link></button>
				<button className="m_left" onClick={() => deleteTask(task)}>Eliminar</button>
			</div>
		))
	}

  render() {
    return (
    	<div>
    		<button>
    			<Link to="/tasks/save">Agregar</Link>
    		</button>
    		{this.showContent()}
    	</div>
    );
  }
}

const mapStateToProps = ({tasksReducer}) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);
