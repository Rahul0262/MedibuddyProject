import React from 'react';
import { PropTypes } from 'prop-types';
import Rating from './Rating';

const Review = ({ name, rating, comment }) => {
	return (
		<div className='review'>
			<span>{name}</span>
			<Rating value={rating} review={true}></Rating>
			<br />
			<p>{comment}</p>
		</div>
	);
};

Review.propTypes = {
	name: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	comment: PropTypes.string.isRequired,
};
export default Review;
