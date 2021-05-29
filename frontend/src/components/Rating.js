import React from 'react';
import { PropTypes } from 'prop-types';

const Rating = ({ value, numReviews, color, review }) => {
	return (
		<div className='rating'>
			<span>
				<i
					style={{ color: color }}
					className={
						value >= 1
							? 'fas fa-star'
							: value >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color: color }}
					className={
						value >= 2
							? 'fas fa-star'
							: value >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color: color }}
					className={
						value >= 3
							? 'fas fa-star'
							: value >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color: color }}
					className={
						value >= 4
							? 'fas fa-star'
							: value >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color: color }}
					className={
						value >= 5
							? 'fas fa-star'
							: value >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span className='ml-1'>
				{numReviews ? numReviews + ' reviews' : review ? '' : 'No reviews'}
			</span>
		</div>
	);
};
Rating.defaultProps = {
	color: '#f8e825',
	review: false,
};
Rating.propTypes = {
	value: PropTypes.number.isRequired,
	numReviews: PropTypes.number,
	color: PropTypes.string,
	review: PropTypes.bool,
};
export default Rating;
