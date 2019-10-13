import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as postActions from '../../actions/postActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const {fetchAll: fetchAllUsers} = usersActions;
const {getUserPosts} = postActions;

class Posts extends Component {

	async componentDidMount() {
		const {
			fetchAllUsers,
			getUserPosts,
			match:{params:{id}}
		} = this.props;
	  if(!this.props.usersReducer.usuarios.length) {
	  	await fetchAllUsers();
	  }
	  if(this.props.usersReducer.error) {
	  	return null;
	  }
	  if(!('posts_key' in this.props.usersReducer.usuarios[id])){
	  	getUserPosts(id);
	  }
	};

	printUser = () => {
		const {
			usersReducer,
			match:{params:{id}}
		} = this.props;

		if(usersReducer.error) {
			return <Fatal message={usersReducer.error}/>
		}
		if(!usersReducer.usuarios.length || usersReducer.loading) {
			return <Spinner />
		}

		return (
			<h1>Autor: {usersReducer.usuarios[id].name}</h1>
		)
	};

	printPosts = () => {
		const {
			usersReducer,
			usersReducer: {usuarios},
			postReducer,
			postReducer: {posts},
			match:{params:{id}}
		} = this.props;

		if(!usuarios.length) return null;
		if(usersReducer.error) return;
		if(postReducer.loading) return <Spinner />;
		if(postReducer.error) return <Fatal message={postReducer.error}/>;
		if(!posts.length) return null;
		if(!('posts_key' in usuarios[id])) return;

		const {posts_key} = usuarios[id];
		return posts[posts_key].map((post) => {
			return (
				<div
					key={post.id}
					className="post_title"
					onClick={() => alert(post.id)}>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</div>
			)
		});
	};

  render() {
    return (
    	<div>
    		{this.printUser()}
    		{this.printPosts()}
    	</div>
    );
  };
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
