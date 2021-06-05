import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userActions';

const RegisterScreen = ({ history, location }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmpassword] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const register = useSelector((state) => state.register);

	const { error, userInfo, loading } = register;
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const isLoggedIn = localStorage.getItem('user') ? true : false;

	useEffect(() => {
		if (userInfo && Object.keys(userInfo).length !== 0) {
			console.log(userInfo);
			history.push(redirect);
		}
	}, [userInfo]);

	useEffect(() => {
		if (isLoggedIn) {
			history.push(redirect);
		}
	}, [isLoggedIn]);

	const registerHandler = (e) => {
		e.preventDefault();
		setMessage('');
		if (!name) {
			setMessage('Enter Name');
		} else if (!email) {
			setMessage('Enter Email');
		} else if (!password) {
			setMessage('Enter Password');
		} else if (password !== confirmpassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(registerUser(name, email, password));
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
			<Row className='justify-content-center'>
				<Col md={6}>
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
							onClick={!loading ? registerHandler : null}
						>
							{loading ? 'Registering…' : 'Register'}
						</Button>
					</Form>
					<Row className='align-items-center'>
						<Col className='text-left'>Have an account?</Col>
						<Col className='text-right'>
							<Link
								className='btn btn-sm btn-light my-3'
								to={redirect ? `/login?redirect=${redirect}` : '/login'}
							>
								Sign In
							</Link>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default RegisterScreen;
