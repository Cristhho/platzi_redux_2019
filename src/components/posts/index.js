import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import * as postActions from '../../actions/postActions';
import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';
import Comments from './Comments';

const {fetchAll: fetchAllUsers} = usersActions;
const {getUserPosts, openClose, getComments} = postActions;

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
		return this.printInfo(posts[posts_key], posts_key);
	};

	printInfo = (posts, posts_key) => (
		posts.map((post, index) => (
			<div
				key={post.id}
				className="post_title">
				<h2>{post.title}</h2>
				<p>{post.body}</p>
				<button
					onClick={() => this.showComments(posts_key, index, post.comments)}>
					{(post.open) ? 'Esconder comentarios': 'Mostrar comentarios'}
				</button>
				{
					(post.open) ? <Comments comments={post.comments} /> : null
				}
			</div>
		))
	);

	showComments = (posts_key, index, comments) => {
		this.props.openClose(posts_key, index);
		if(!comments.length) this.props.getComments(posts_key, index);
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
	getUserPosts,
	openClose,
	getComments
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
