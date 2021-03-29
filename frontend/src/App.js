import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Footer from './components/footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/login' component={LoginScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
