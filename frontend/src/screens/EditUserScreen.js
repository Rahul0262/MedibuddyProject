import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EditUserScreen = ({ history, match }) => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [isAdmin, setIsAdmin] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	// const fetchMyOrders = async () => {
	// 	axios
	// 		.get(`/api/orders/myorders`, {
	// 			headers: {
	// 				Authorization: `Bearer ${login.userInfo.token}`,
	// 			},
	// 		})
	// 		.then((res) => {
	// 		})
	// 		.catch((err) => {
	// 		});
	// };

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else if (userInfo && userInfo.isAdmin) {
			console.log('entered');
			axios
				.get(`/api/users/${match.params.id}`, {
					headers: {
						Authorization: `Bearer ${login.userInfo.token}`,
					},
				})
				.then((res) => {
					setLoading(false);
					setName(res.data.name);
					setEmail(res.data.email);
					setIsAdmin(res.data.isAdmin);
				})
				.catch((err) => {
					setLoading(true);
					setError(err.response.data.message);
				});
		} else {
			history.push('/');
		}
	}, [history, userInfo]);

	const updateHandler = (e) => {
		e.preventDefault();
		if (!name) {
			setMessage('Name should not be empty');
		} else if (!email) {
			setMessage('Email should not be empty');
		} else {
			setLoading(true);
			axios
				.put(
					`/api/users/${match.params.id}`,
					{
						_id: match.params.id,
						name,
						email,
						isAdmin,
					},
					{
						headers: {
							Authorization: `Bearer ${login.userInfo.token}`,
						},
					}
				)
				.then((res) => {
					setLoading(false);
					history.push('/admin/users');
				})
				.catch((err) => {
					setLoading(false);
					setError(err.response.data.message);
				});
		}
	};

	return (
		<>
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
			<Link className='btn btn-light my-3' to='/admin/users'>
				<i className='fas fa-chevron-left mr-2'></i>
				Go Back
			</Link>
			{!error && (
				<Row className='justify-content-center'>
					<Col md={6}>
						<h1> Edit User </h1>
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
							<Form.Group controlId='formBasicCheckbox'>
								<Form.Check
									checked={isAdmin}
									type='checkbox'
									label='Is Admin'
									onChange={(e) => setIsAdmin(e.target.checked)}
								/>
							</Form.Group>
							<Button
								variant='primary'
								disabled={loading}
								onClick={!loading ? updateHandler : null}
							>
								{loading ? <Spinner size='sm' animation='border' /> : 'Update'}
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</>
	);
};

export default EditUserScreen;
