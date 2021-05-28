import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import { createOrder } from '../actions/orderActions';
import axios from 'axios';

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
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, order, success, error } = orderCreate;

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
		}
		// eslint-disable-next-line
	}, [success, history]);

	const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};

	const displayRazorpay = async () => {
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}

		const result = await axios.post('/api/payment/order', {
			amount: Number(totalPrice) * 100,
		});

		if (!result) {
			alert('Server error. Are you online?');
			return;
		}

		const { amount, id: order_id, currency } = result.data;

		const options = {
			key: 'rzp_test_kHfECp2tfJiBPQ', // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: 'Test',
			description: 'Test Transaction',
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};
				console.log(data);
				dispatch(
					createOrder({
						orderItems: cart.cartItems,
						totalPrice,
						shippingAddress,
						paymentInfo: data,
					})
				);
				// const result = await axios.post('http://localhost:5000/payment/success', data);

				// alert(result.data.msg);
			},
			prefill: {
				name: userInfo.name,
				email: userInfo.email,
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

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
		} else if (cart.cartItems.length === 0) {
			setMessage('Your Cart is Empty!! Start Shopping');
		} else {
			dispatch(
				saveShippingAddress({
					address,
					city,
					country,
					postalCode,
				})
			);
			displayRazorpay();
		}
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
			{message && (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Alert variant='warning'>{message}</Alert>
					</Col>
				</Row>
			)}
			{cart.cartItems.length === 0 ? (
				<Row className='justify-content-center'>
					<Col sm={6} className='text-center'>
						<Link className='btn btn-light my-3' to='/'>
							<i className='fas fa-shopping-bag mr-2'></i>
							Continue Shopping
						</Link>
					</Col>
				</Row>
			) : (
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
			)}
		</>
	);
};

export default ShippingScreen;
