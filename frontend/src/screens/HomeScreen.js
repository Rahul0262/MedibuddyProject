import React, { useEffect } from 'react';
import { Alert, Col, Row, Spinner } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import TopProducts from '../components/TopProducts';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products, topProducts } = productList;
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
			{topProducts && products && !loading && (
				<>
					<TopProducts topProducts={topProducts} />
					<h1 className='mt-3'>Our Products</h1>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default HomeScreen;
