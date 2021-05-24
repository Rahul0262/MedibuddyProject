import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/userActions';

const LoginScreen = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const login = useSelector((state) => state.login);
	const { error, userInfo, loading } = login;
	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo && Object.keys(userInfo).length !== 0) {
			console.log(userInfo);
			history.push(redirect);
		}
	}, [userInfo]);

	const loginHandler = (e) => {
		e.preventDefault();
		dispatch(loginUser(email, password));
	};

	return (
		<>
			{error && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='danger'>{error}</Alert>
					</Col>
				</Row>
			)}
			<Row className='justify-content-center'>
				<Col md={6}>
					<Form>
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

						<Button
							variant='primary'
							disabled={loading}
							onClick={!loading ? loginHandler : null}
						>
							{loading ? 'LoggingIn…' : 'Login'}
						</Button>
					</Form>
					<Row className='align-items-center'>
						<Col className='text-left'>Not Registered?</Col>
						<Col className='text-right'>
							<Link
								className='btn btn-sm btn-light my-3'
								to={redirect ? `/register?redirect=${redirect}` : '/register'}
							>
								Sign Up!
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default LoginScreen;
