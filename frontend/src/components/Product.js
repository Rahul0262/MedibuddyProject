import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image}></Card.Img>
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating value={product.rating} numReviews={product.numReviews} />
				</Card.Text>
				<Card.Text as='h3' className='pt-3'>
					₹{product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
