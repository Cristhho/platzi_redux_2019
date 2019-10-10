import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as postActions from '../../actions/postActions';

const {fetchAll: fetchAllUsers} = usersActions;
const {getUserPosts} = postActions;

class Posts extends Component {

	async componentDidMount() {
	  if(!this.props.usersReducer.usuarios.length) {
	  	await this.props.fetchAllUsers();
	  }
	  this.props.getUserPosts(this.props.match.params.id);
	}

  render() {
    return (
    	<div>
    		<h1>Autor: </h1>
    		{this.props.match.params.id}
    	</div>
    );
  }
}

const mapStateToProps = ({usersReducer, postReducer}) => {
  return {
  	usersReducer,
  	postReducer
  }
};

const mapDispatchToProps = {
	fetchAllUsers,
	getUserPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
