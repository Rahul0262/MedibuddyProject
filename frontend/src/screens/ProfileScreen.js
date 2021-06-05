import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Badge,
	Button,
	Col,
	Form,
	Row,
	Spinner,
	Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmpassword] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(null);
	// const [updatedmsg, setUpdatedmsg] = useState(false);
	const [myOrders, setMyOrders] = useState([]);
	const [loadingOrders, setLoadingOrders] = useState(true);
	// const [serverOrders, setServerOrders] = useState(true);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { error, user, loading } = userDetails;

	// const isLoggedIn = localStorage.getItem('user') ? true : false;

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	const userUpdate = useSelector((state) => state.userUpdate);
	let { success } = userUpdate;

	//my orders function
	const fetchMyOrders = async () => {
		axios
			.get(`/api/orders/myorders`, {
				headers: {
					Authorization: `Bearer ${login.userInfo.token}`,
				},
			})
			.then((res) => {
				setMyOrders(res.data);
				setLoadingOrders(false);
				// setServerOrders(true);
			})
			.catch((err) => {
				setLoadingOrders(false);
				// setServerOrders(false);
			});
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user || Object.keys(user).length === 0 || !user.name) {
				dispatch(getUserProfile('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
			fetchMyOrders();
		}
	}, [user, history, dispatch, userInfo]);

	const updateHandler = (e) => {
		e.preventDefault();
		setMessage('');
		if (!name) {
			setMessage('Name should not be empty');
		} else if (!email) {
			setMessage('Email should not be empty');
		} else if (password !== confirmpassword) {
			setMessage('Passwords do not match');
		} else {
			// setUpdatedmsg(true);
			dispatch(
				updateUserProfile({
					id: user._id,
					name,
					email,
					password,
				})
			);
		}
	};

	return (
		<>
			{loading && (
				<Row>
					<Col sm={12} className='text-center'>
						<Spinner animation='border' />
					</Col>
				</Row>
			)}
			{message && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='warning'>{message}</Alert>
					</Col>
				</Row>
			)}

			{error && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='danger'>{error}</Alert>
					</Col>
				</Row>
			)}
			{!error && (
				<Row>
					<Col md={3}>
						<h1> My Profile</h1>
						{success && (
							<Row>
								<Col className='text-center'>
									<Alert variant='success'>Profile Updated</Alert>
								</Col>
							</Row>
						)}
						<Form>
							<Form.Group controlId='formBasicName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									disabled={loading}
									type='name'
									placeholder='Enter name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicEmail'>
								<Form.Label>Email address</Form.Label>
								<Form.Control
									disabled={loading}
									type='email'
									placeholder='Enter email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicPassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									disabled={loading}
									type='password'
									placeholder='Enter password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicConfirmpassword'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									disabled={loading}
									type='password'
									placeholder='Confirm password'
									value={confirmpassword}
									onChange={(e) => setConfirmpassword(e.target.value)}
								/>
							</Form.Group>

							<Button
								variant='primary'
								disabled={loading}
								onClick={!loading ? updateHandler : null}
							>
								{loading ? 'Updating…' : 'Update'}
							</Button>
						</Form>
					</Col>
					<Col md={9} className='text-center'>
						<h1> My Orders</h1>
						{loadingOrders ? (
							<Row>
								<Col sm={12} className='text-center'>
									<Spinner animation='border' />
								</Col>
							</Row>
						) : myOrders.length === 0 ? (
							<div className='my-3'>
								<h6>Oops!! No Orders yet</h6>
								<br />
								<Link className='btn btn-light' to='/'>
									<i className='fas fa-shopping-bag mr-2'></i>
									Start Shopping
								</Link>
							</div>
						) : (
							<Table striped bordered size='sm'>
								<thead>
									<tr>
										<th>Order Id</th>
										<th>Total Price</th>
										<th>Ordered at</th>
										<th>Order Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{myOrders.map((item, index) => (
										<tr key={index}>
											<td>{item._id}</td>
											<td>₹{item.totalPrice}</td>
											<td>{item.createdAt.substr(0, 10)}</td>
											<td>
												{item.isDelivered ? (
													<Badge pill variant='success'>
														Delivered
													</Badge>
												) : (
													<Badge pill variant='warning'>
														Proccessing
													</Badge>
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
			)}
		</>
	);
};

export default ProfileScreen;
