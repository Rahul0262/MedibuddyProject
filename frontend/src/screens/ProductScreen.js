import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
	Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
// import products from '../products';

const ProductScreen = ({ history, match }) => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [errMsg, setErrMsg] = useState('Oh! Oh! Something went wrong...');
	const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		const fetchProduct = async () => {
			axios
				.get(`/api/products/${match.params.id}`)
				.then((res) => {
					setProduct(res.data);
					setLoading(false);
					setServer(true);
				})
				.catch((err) => {
					setLoading(false);
					setServer(false);
					setErrMsg(err.response.data.message);
				});
		};
		fetchProduct();
	}, [match]);
	const addtoCart = () => {
		// console.log(`Yeah you have added ${match.params.id} to cart`);
		if (quantity === 0)
			history.push(`/cart/${match.params.id}?qty=${quantity + 1}`);
		else history.push(`/cart/${match.params.id}?qty=${quantity}`);
	};
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				<i className='fas fa-chevron-left mr-2'></i>
				Go Back
			</Link>
			{!server && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='danger'>{errMsg}</Alert>
					</Col>
				</Row>
			)}
			{server && loading && (
				<Row>
					<Col sm={12} className='text-center'>
						<Spinner animation='border' />
					</Col>
				</Row>
			)}
			{server && !loading && (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid></Image>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									numReviews={product.numReviews}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
							<ListGroup.Item>
								Description: {product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>₹{product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Quantity:</Col>
											<Col>
												<Form.Control
													size='sm'
													as='select'
													value={quantity}
													onChange={(e) => setQuantity(e.target.value)}
												>
													{[...Array(product.countInStock)].map((x, i) => (
														<option key={i + 1} value={i + 1}>
															{i + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
										onClick={() => addtoCart()}
										disabled={product.countInStock === 0}
									>
										Add to cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
