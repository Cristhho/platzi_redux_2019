import React from 'react';

const Comments = (props) => {
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

export default Comments;
