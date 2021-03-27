import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
	Alert,
	Button,
	Card,
	Col,
	Form,
	Image,
	ListGroup,
	Row,
} from 'react-bootstrap';

const CartScreen = ({ history, match, location }) => {
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (match.params.id) dispatch(addToCart(match.params.id, qty));
	}, [dispatch, match, qty]);

	const removeitemfromCart = (id) => {
		dispatch(removeFromCart(id));
	};

	const computedTotalPrice = function () {
		let totPrice = 0;
		for (let i = 0; i < cartItems.length; i++)
			totPrice += Number(
				(Number(cartItems[i].price) * Number(cartItems[i].qty)).toFixed(2)
			);
		return Number(totPrice.toFixed(2));
	};

	const checkoutHandler = () => {
		history.push(`/login?redirect=shipping`);
	};

	return (
		<>
			{cartItems.length > 0 && (
				<Link className='btn btn-light my-3' to='/'>
					<i className='fas fa-shopping-bag mr-2'></i>
					Continue Shopping
				</Link>
			)}
			<Row>
				<Col md={8}>
					<h1> Your Cart</h1>
					{cartItems.length === 0 ? (
						<Row>
							<Col sm={12} className='text-center'>
								<Alert variant='warning'>
									Oops! looks like you don't have any item in cart
								</Alert>
							</Col>
							<Col className='text-center'>
								<Link className='btn btn-light my-3' to='/'>
									Start Shopping
								</Link>
							</Col>
						</Row>
					) : (
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col md={2}></Col>
									<Col md={4}>Item</Col>
									<Col md={3}>Quantity</Col>
									<Col md={2}>Price</Col>
								</Row>
							</ListGroup.Item>
							{cartItems.map((item) => (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Link to={`/product/${item.product}`}>
												<Image
													src={item.image}
													alt={item.name}
													fluid
													rounded
												></Image>
											</Link>
										</Col>
										<Col md={4}>
											<Link to={`/product/${item.product}`}> {item.name}</Link>
										</Col>
										<Col md={3}>
											<Row>
												<Col md={8} sm={12}>
													<Form.Control
														size='sm'
														as='select'
														value={item.qty}
														onChange={(e) =>
															dispatch(
																addToCart(item.product, Number(e.target.value))
															)
														}
													>
														{[...Array(item.countInStock)].map((x, i) => (
															<option key={i + 1} value={i + 1}>
																{i + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</Col>
										<Col md={2}>₹{Number(item.price).toFixed(2)}</Col>
										<Col md={1}>
											<Button
												variant='light'
												size='sm'
												onClick={() => removeitemfromCart(item.product)}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
				</Col>
				{cartItems.length > 0 && (
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row className='mb-2'>
										<Col>
											<h3>
												Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)})
												items
											</h3>
										</Col>
									</Row>
									<Row>
										<Col>Total Price:</Col>
										<Col>
											<strong>₹{computedTotalPrice()}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button variant='primary' block onClick={checkoutHandler}>
										Proceed to Checkout
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				)}
			</Row>
		</>
	);
};

export default CartScreen;
