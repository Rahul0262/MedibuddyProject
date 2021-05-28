import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrdersListScreen = ({ history }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [error, setError] = useState('');
	// const [isDeleted, setIsDeleted] = useState(false);

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			axios
				.get(`/api/orders`, {
					headers: {
						Authorization: `Bearer ${userInfo.token}`,
					},
				})
				.then((res) => {
					setOrders(res.data);
					setLoading(false);
					setServer(true);
				})
				.catch((err) => {
					setLoading(false);
					setServer(false);
					setError(err.response.data.message);
				});
		} else {
			history.push('/');
		}
	}, [userInfo]);

	return (
		<>
			{!server && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='danger'>{error}</Alert>
					</Col>
				</Row>
			)}
			<Row>
				<Col className='text-center'>
					<h1> Orders </h1>
					{loading ? (
						<Row className='mt-4'>
							<Col sm={12} className='text-center'>
								<Spinner animation='border' />
							</Col>
						</Row>
					) : orders.length === 0 ? (
						<div className='my-3'>
							<h6>Oops!! No Orders yet</h6>
						</div>
					) : (
						<Table striped bordered size='sm' className='mt-4'>
							<thead>
								<tr>
									<th>Order Id</th>
									<th>Customer name</th>
									<th>Ordered Date</th>
									<th>Total price</th>
									<th>Delivered</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{orders.map((item, index) => (
									<tr key={index}>
										<td>{item._id}</td>
										<td>{item.user && item.user.name}</td>
										<td>{item.createdAt.substr(0, 10)}</td>
										<td>₹{item.totalPrice}</td>
										<td>
											{item.isDelivered ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<Link to={`/order/${item._id}`}>
												<Button variant='light' size='sm'>
													Details
												</Button>
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Col>
			</Row>
		</>
	);
};

export default OrdersListScreen;
