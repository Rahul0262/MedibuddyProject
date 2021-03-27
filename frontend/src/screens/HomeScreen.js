import React, { useEffect } from 'react';
import { Alert, Col, Row, Spinner } from 'react-bootstrap';
// import axios from 'axios';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
		/* Instead of direct calling we used reducers */

		// const fetchProducts = async () => {
		// 	const { data } = await axios.get('/api/products');
		// 	setProducts(data);
		// };
		// fetchProducts();
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading && (
				<Row>
					<Col sm={12} className='text-center'>
						<Spinner animation='border' />
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
			{products && (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
