import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import EditUserScreen from './screens/EditUserScreen';
import ProductListScreen from './screens/ProductListScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/admin/users' component={UsersListScreen} />
					<Route path='/admin/products' component={ProductListScreen} />
					<Route path='/admin/product/create' component={AddProductScreen} />
					<Route path='/admin/user/:id?/edit' component={EditUserScreen} />
					<Route
						path='/admin/product/:id?/edit'
						component={EditProductScreen}
					/>
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
