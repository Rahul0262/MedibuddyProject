import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Card,
	Col,
	Image,
	ListGroup,
	Row,
	Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
// import products from '../products';

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [errMsg, setErrMsg] = useState('Oh! Oh! Something went wrong...');
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
			// const { data } = await axios.get(`/api/products/${match.params.id}`);
		};
		fetchProduct();
	}, [match]);
	// const product = products.find((p) => p._id === match.params.id);
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{!server && (
				<Row className='align'>
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
								Description: ${product.description}
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
								<ListGroup.Item>
									<Button
										className='btn-block'
										type='button'
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
