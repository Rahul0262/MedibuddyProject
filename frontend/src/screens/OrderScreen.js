import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Spinner,
	Alert,
	Badge,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const OrderScreen = ({ match }) => {
	const [order, setOrder] = useState({});
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [errMsg, setErrMsg] = useState('Oh! Oh! Something went wrong...');
	const login = useSelector((state) => state.login);
	useEffect(() => {
		const fetchOrder = async () => {
			axios
				.get(`/api/orders/${match.params.id}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${login.userInfo.token}`,
					},
				})
				.then((res) => {
					setOrder(res.data);
					setLoading(false);
					setServer(true);
				})
				.catch((err) => {
					setLoading(false);
					setServer(false);
					setErrMsg(err.response.data.message);
				});
		};
		fetchOrder();
	}, [match]);

	return (
		<>
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
					<Link className='btn btn-light' to='/profile'>
						<i className='fas fa-chevron-left mr-2'></i>
						Go Back
					</Link>
					<Row>
						<Col md={8}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Order Id</h2>
									<p>{order._id}</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Shipping</h2>
									<p>
										<strong>Name: </strong> {order.user.name}
									</p>
									<p>
										<strong>Address:</strong>
										<br />
										{order.shippingAddress.address}, <br />
										{order.shippingAddress.city},
										{order.shippingAddress.postalCode}
										<br />
										{order.shippingAddress.country}
									</p>
								</ListGroup.Item>
								<ListGroup.Item>
									<h2>Ordered Items</h2>
									<ListGroup variant='flush'>
										{order.orderItems.map((item, index) => (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image
															src={item.image}
															alt={item.name}
															fluid
															rounded
														/>
													</Col>
													<Col>
														<Link to={`/product/${item.product}`}>
															{item.name}
														</Link>
													</Col>
													<Col md={4}>
														{item.qty} x ₹{item.price} = ₹
														{item.qty * item.price}
													</Col>
												</Row>
											</ListGroup.Item>
										))}
									</ListGroup>
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2>Order Summary</h2>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total Items</Col>
											<Col>
												{order.orderItems.reduce(
													(acc, item) => acc + item.qty,
													0
												)}
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Total Price</Col>
											<Col>₹{order.totalPrice.toFixed(2)}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status</Col>
											<Col>
												{order.isDelivered ? (
													<Badge pill variant='success'>
														Delivered
													</Badge>
												) : (
													<Badge pill variant='warning'>
														Proccessing
													</Badge>
												)}
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default OrderScreen;
