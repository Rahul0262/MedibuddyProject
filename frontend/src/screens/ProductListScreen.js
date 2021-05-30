import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	Button,
	Col,
	Image,
	Row,
	Spinner,
	Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reactS3 from 'react-s3';

const ProductListScreen = ({ history }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [error, setError] = useState('');
	const [isDeleted, setIsDeleted] = useState(false);

	const login = useSelector((state) => state.login);
	const { userInfo } = login;

	const fetchAllProducts = async () => {
		axios
			.get(`/api/products`, {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
				setServer(true);
			})
			.catch((err) => {
				setError(err.response.data.message);
				setLoading(false);
				setServer(false);
			});
	};

	useEffect(() => {
		if ((userInfo && userInfo.isAdmin) || isDeleted) {
			fetchAllProducts();
		} else {
			history.push('/');
		}
	}, [userInfo, isDeleted]);

	const config = {
		bucketName: process.env.REACT_APP_BUCKET_NAME,
		dirName: process.env.REACT_APP_DIR_NAME,
		region: process.env.REACT_APP_REGION,
		accessKeyId: process.env.REACT_APP_ACCESSKEY,
		secretAccessKey: process.env.REACT_APP_SECRET,
	};

	const deleteImage = (img) => {
		const arr = img.split('/');
		reactS3
			.deleteFile(arr[arr.length - 1], config)
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
	};

	const deleteUserHandler = (item) => {
		if (window.confirm('Are you sure?')) {
			setIsDeleted(false);
			setLoading(true);
			axios
				.delete(`/api/products/${item._id}`, {
					headers: {
						Authorization: `Bearer ${userInfo.token}`,
					},
				})
				.then(() => {
					setIsDeleted(true);
					setLoading(false);
					// setServer(true);
					deleteImage(item.image);
				})
				.catch((err) => {
					setIsDeleted(false);
					setError(err.response.data.message);
					setLoading(false);
					// setServer(false);
				});
		}
	};

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
				<Col sm={6}>
					<h1> Products </h1>
				</Col>
				<Col sm={6} className='text-right'>
					<Link to='/admin/product/create'>
						<Button variant='dark'>Add Product</Button>
					</Link>
				</Col>
			</Row>
			<Row>
				<Col className='text-center'>
					{loading ? (
						<Row className='mt-4'>
							<Col sm={12} className='text-center'>
								<Spinner animation='border' />
							</Col>
						</Row>
					) : products.length === 0 ? (
						<div className='my-3'>
							<h6>Oops!! No Products yet</h6>
						</div>
					) : (
						<Table striped bordered size='sm' className='mt-4'>
							<thead>
								<tr>
									<th>Product Id</th>
									<th>Product Name</th>
									<th>Price</th>
									<th>Brand</th>
									<th>Stock Count</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{products.map((item, index) => (
									<tr key={index}>
										<td>{item._id}</td>
										<td>{item.name}</td>
										<td>₹{item.price}</td>
										<td>{item.brand}</td>
										<td>{item.countInStock}</td>
										<td>
											<Link to={`/admin/product/${item._id}/edit`}>
												<Button variant='light' size='sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</Link>
											<Button
												variant='danger'
												size='sm'
												onClick={() => deleteUserHandler(item)}
											>
												<i className='fas fa-trash'></i>
											</Button>
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

export default ProductListScreen;
