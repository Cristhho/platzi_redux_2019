import React from 'react';

const Fatal = (props) => (
		<div className="center">
			<span className="error_icon">X</span>
			<h2 className="red">{props.message}</h2>
		</div>
  );

export default Fatal;
