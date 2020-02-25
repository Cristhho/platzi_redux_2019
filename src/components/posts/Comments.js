import React from 'react';
import {connect} from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const Comments = (props) => {
	if(props.comments_error) return <Fatal message={props.comments_error} />;
	if(props.loading_comments && !props.comments.length) return <Spinner />;

	const printComments = () => (
		props.comments.map((comment) => (
			<li key={comment.id}>
				<span className="comment_email">{comment.email}</span>
				<p>{comment.body}</p>
			</li>
		))
	);

  return (
  	<ul>
  		{printComments()}
  	</ul>
  );
};

const mapStateToProps = ({postReducer}) => postReducer;

export default connect(mapStateToProps)(Comments);
