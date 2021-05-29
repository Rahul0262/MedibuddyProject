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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import Review from '../components/Review';

const ProductScreen = ({ history, match }) => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [errMsg, setErrMsg] = useState('Oh! Oh! Something went wrong...');
	const [quantity, setQuantity] = useState(0);
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');
	const [loadingRating, setLoadingRating] = useState(false);
	const [errRating, setErrRating] = useState('');

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

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
	}, [match, history]);

	const addReview = () => {
		setLoadingRating(true);
		axios
			.post(
				`/api/products/${match.params.id}/review`,
				{
					name: userInfo.name,
					rating,
					comment,
					productId: match.params.id,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
			)
			.then((res) => {
				setProduct(res.data);
				setComment('');
				setRating('');
				setLoadingRating(false);
			})
			.catch((err) => {
				setLoadingRating(false);
				setComment('');
				setRating('');
				setErrRating(err.response.data.message);
				setTimeout(() => {
					setErrRating('');
				}, 3000);
			});
	};

	const addtoCart = () => {
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
				<>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid></Image>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>Reviews</h3>
								</ListGroup.Item>
								{product && product.reviews.length === 0 && (
									<ListGroup.Item>No Reviews</ListGroup.Item>
								)}
								{product.reviews.map((r, i) => (
									<ListGroup.Item key={i}>
										<Review
											name={r.name}
											rating={r.rating}
											comment={r.comment}
										></Review>
									</ListGroup.Item>
								))}
							</ListGroup>
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
							{errRating && (
								<Row className='justify-content-center mt-2'>
									<Col className='text-center'>
										<Alert variant='warning'>{errRating}</Alert>
									</Col>
								</Row>
							)}
							<ListGroup variant='flush'>
								<ListGroup.Item>Add Review</ListGroup.Item>
								<ListGroup.Item>
									<Form>
										<Form.Group controlId='formBasicRating'>
											<Form.Label>Rating</Form.Label>
											<Form.Control
												size='sm'
												as='select'
												disabled={loadingRating}
												value={rating}
												onChange={(e) => setRating(e.target.value)}
											>
												<option value=''>Select</option>
												<option value='1'>Poor</option>
												<option value='2'>Fair</option>
												<option value='3'>Good</option>
												<option value='4'>Very Good</option>
												<option value='5'>Excellent</option>
											</Form.Control>
										</Form.Group>

										<Form.Group controlId='formBasicPassword'>
											<Form.Label>Comment</Form.Label>
											<Form.Control
												disabled={loadingRating}
												as='textarea'
												rows={2}
												placeholder='Add Comment'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											/>
										</Form.Group>

										<Button
											variant='light'
											disabled={loadingRating}
											onClick={!loadingRating ? addReview : null}
										>
											{loadingRating ? (
												<Spinner size='sm' animation='border' />
											) : (
												'Submit'
											)}
										</Button>
									</Form>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
