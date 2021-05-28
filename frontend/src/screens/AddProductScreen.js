import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddProductScreen = ({ history, match }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('/images/airpods.jpg');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState(null);

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	const createProduct = async () => {
		setLoading(true);
		axios
			.post(
				`/api/products`,
				{
					price,
					countInStock,
					name,
					image,
					description,
					brand,
					category,
				},
				{
					headers: {
						Authorization: `Bearer ${login.userInfo.token}`,
					},
				}
			)
			.then((res) => {
				setLoading(false);
				history.push('/admin/products');
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.message);
			});
	};

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		}
	}, [history, userInfo]);

	const createHandler = (e) => {
		e.preventDefault();
		if (!name) {
			setMessage('Name should not be empty');
		} else if (!price) {
			setMessage('Price should not be empty');
		} else if (!description) {
			setMessage('Description should not be empty');
		} else if (!countInStock) {
			setMessage('Stock count should not be empty');
		} else if (!brand) {
			setMessage('Brand should not be empty');
		} else if (!category) {
			setMessage('Category should not be empty');
		} else if (!image) {
			setMessage('Image should not be empty');
		} else {
			createProduct();
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
			<Link className='btn btn-light my-3' to='/admin/products'>
				<i className='fas fa-chevron-left mr-2'></i>
				Go Back
			</Link>
			{!error && (
				<Row className='justify-content-center'>
					<Col md={6}>
						<h1> Add Product </h1>
						<Form>
							<Form.Group controlId='formBasicName'>
								<Form.Label>Name</Form.Label>
								<Form.Control
									disabled={loading}
									type='text'
									placeholder='Iphone 12 pro'
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicDescription'>
								<Form.Label>Description</Form.Label>
								<Form.Control
									disabled={loading}
									type='text'
									placeholder='Add Description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicBrand'>
								<Form.Label>Brand</Form.Label>
								<Form.Control
									disabled={loading}
									type='text'
									placeholder='Apple'
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicCategory'>
								<Form.Label>Category</Form.Label>
								<Form.Control
									disabled={loading}
									type='text'
									placeholder='Electronics'
									value={category}
									onChange={(e) => setCategory(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicPrice'>
								<Form.Label>Price</Form.Label>
								<Form.Control
									disabled={loading}
									type='number'
									placeholder='500'
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId='formBasicStock'>
								<Form.Label>Stock Count</Form.Label>
								<Form.Control
									disabled={loading}
									type='number'
									placeholder='10'
									value={countInStock}
									onChange={(e) => setCountInStock(e.target.value)}
								/>
							</Form.Group>

							<Button
								variant='primary'
								disabled={loading}
								onClick={!loading ? createHandler : null}
							>
								{loading ? (
									<Spinner size='sm' animation='border' />
								) : (
									'Release Product'
								)}
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</>
	);
};

export default AddProductScreen;