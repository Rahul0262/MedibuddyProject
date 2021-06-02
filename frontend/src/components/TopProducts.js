import React from 'react';
import { Button, Carousel, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopProducts = ({ topProducts }) => {
	return (
		<div>
			<Carousel pause='hover'>
				{topProducts.map((product, index) => (
					<Carousel.Item key={product._id}>
						<Row>
							{index % 2 == 0 && (
								<Col md={6}>
									<Image fluid rounded src={product.image} alt={product.name} />
								</Col>
							)}
							<Col md={6} className='my-auto text-center'>
								<h3>{product.name}</h3>
								<p>{product.description}</p>
								<h5>₹ {product.price}</h5>
								<Link to={`/product/${product._id}`}>
									<Button size='sm' variant='light'>
										Details
									</Button>
								</Link>
							</Col>
							{index % 2 != 0 && (
								<Col md={6}>
									<Image fluid rounded src={product.image} alt={product.name} />
								</Col>
							)}
						</Row>
					</Carousel.Item>
				))}
			</Carousel>
		</div>
	);
};

export default TopProducts;
