import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reactS3 from 'react-s3';

const EditProductScreen = ({ history, match }) => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [message, setMessage] = useState(null);
	const [isRemoved, setIsRemoved] = useState(false);

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	const upload_file_to_s3 = (url, form, filename) => {
		setLoading(true);
		axios
			.post(url, form)
			.then((res) => {
				console.log(res, filename);
				setFile(null);
				setLoading(false);
				updateProduct(filename);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setFile(null);
			});
	};

	const genrates3url = () => {
		setLoading(true);
		const randomID = parseInt(Math.random() * 10000000);
		const filename = `${randomID}.jpg`;
		axios
			.post(
				'/api/aws/generatePreSignedUrl',
				{
					filename: filename,
				},
				{
					headers: {
						Authorization: `Bearer ${userInfo.token}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				const form = new FormData();
				Object.keys(res.data.fields).forEach((key) => {
					form.append(key, res.data.fields[key]);
				});
				form.append('file', file);
				setLoading(false);
				upload_file_to_s3(res.data.url, form, filename);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const updateProduct = async (filename = null) => {
		setLoading(true);
		const data = {
			price,
			countInStock,
			name,
			description,
			brand,
			category,
		};
		if (isRemoved) {
			data.image = filename;
		} else {
			data.image = image.split('/').pop();
		}
		axios
			.put(`/api/products/${match.params.id}`, data, {
				headers: {
					Authorization: `Bearer ${login.userInfo.token}`,
				},
			})
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
		if (userInfo && userInfo.isAdmin) {
			axios
				.get(`/api/products/${match.params.id}`, {
					headers: {
						Authorization: `Bearer ${login.userInfo.token}`,
					},
				})
				.then((res) => {
					setLoading(false);
					setName(res.data.name);
					setBrand(res.data.brand);
					setCountInStock(res.data.countInStock);
					setCategory(res.data.category);
					setDescription(res.data.description);
					setPrice(res.data.price);
					setImage(res.data.image);
				})
				.catch((err) => {
					setLoading(true);
					setError(err.response.data.message);
				});
		} else {
			history.push('/');
		}
	}, [history, userInfo]);

	// const config = {
	// 	bucketName: process.env.REACT_APP_BUCKET_NAME,
	// 	dirName: process.env.REACT_APP_DIR_NAME,
	// 	region: process.env.REACT_APP_REGION,
	// 	accessKeyId: process.env.REACT_APP_ACCESSKEY,
	// 	secretAccessKey: process.env.REACT_APP_SECRET,
	// };

	const uploadHandler = async (e) => {
		console.log(e.target.files);
		if (e.target.files.length !== 0) {
			setFile(
				Array.from(e.target.files).filter((f) => {
					const ext = f.name.split('.').pop();
					return ext === 'jpeg' || ext === 'png' || ext === 'jpg';
				})[0]
			);
		} else {
			setFile(null);
		}
		// reactS3
		// 	.uploadFile(e.target.files[0], config)
		// 	.then((data) => {
		// 		console.log(data);
		// 		setImage(data.location);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	const removeHandler = (img) => {
		const arr = img.split('/');
		axios
			.delete(`/api/aws/${arr[arr.length - 1]}`, {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			.then((res) => {
				console.log(res);
				setImage('');
				setIsRemoved(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
		} else {
			if (isRemoved) {
				if (!file) {
					setMessage('Image should not be empty');
				} else {
					genrates3url();
				}
			} else {
				if (!image) {
					setMessage('Image should not be empty');
				} else {
					updateProduct();
				}
			}
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
						<h1> Edit Product </h1>
						<Form>
							{image && (
								<Row className='align-items-center mb-3'>
									<Col md={8}>
										Image
										<Image rounded src={image} sizes='200' fluid></Image>
									</Col>
									<Col md={2}>
										<Button onClick={(e) => removeHandler(image)}>
											Remove
										</Button>
									</Col>
								</Row>
							)}
							{!image && (
								<Form.Group controlId='formBasicFile'>
									<Form.Label>Image</Form.Label>
									<Form.File onChange={uploadHandler} />
								</Form.Group>
							)}
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
									'Update Product'
								)}
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</>
	);
};

export default EditProductScreen;
