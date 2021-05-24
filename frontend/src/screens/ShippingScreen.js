import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const [message, setMessage] = useState('');

	const totalPrice = Number(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line
	}, [success, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		setMessage('');
		if (!address) {
			setMessage('Enter Name');
		} else if (!city) {
			setMessage('Enter City');
		} else if (!country) {
			setMessage('Enter Country');
		} else if (!postalCode) {
			setMessage('Enter Postal Code');
		} else {
			dispatch(
				saveShippingAddress({
					address,
					city,
					country,
					postalCode,
				})
			);
			// history.push('/payment');
			dispatch(
				createOrder({
					orderItems: cart.cartItems,
					totalPrice,
					shippingAddress,
				})
			);
		}
	};
	return (
		<>
			{error && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='error'>{error}</Alert>
					</Col>
				</Row>
			)}
			{message && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='error'>{message}</Alert>
					</Col>
				</Row>
			)}
			<Row className='justify-content-center'>
				<Col md={6}>
					<Form>
						<Form.Group controlId='formBasicAddress'>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Address'
								value={address}
								disabled={loading}
								required
								onChange={(e) => setAddress(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicCity'>
							<Form.Label>City</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter City'
								value={city}
								disabled={loading}
								required
								onChange={(e) => setCity(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicCountry'>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Country'
								value={country}
								disabled={loading}
								required
								onChange={(e) => setCountry(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId='formBasicPostal'>
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter Postal'
								value={postalCode}
								disabled={loading}
								required
								onChange={(e) => setPostalCode(e.target.value)}
							/>
						</Form.Group>

						<Button
							disabled={loading}
							variant='primary'
							onClick={submitHandler}
						>
							Submit & Place Order
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	);
};

export default ShippingScreen;
