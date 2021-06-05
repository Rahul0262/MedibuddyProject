import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const Header = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.login);
	const { userInfo } = userLogin;
	console.log(process.env);
	const logoutHandler = () => {
		console.log('logged out');
		dispatch(logoutUser());
	};
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>Test</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart mr-1'></i>Cart
								</Nav.Link>
							</LinkContainer>
							{!userInfo || Object.keys(userInfo).length === 0 ? (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user mr-1'></i>Sign In
									</Nav.Link>
								</LinkContainer>
							) : (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={() => logoutHandler()}>
										LogOut
									</NavDropdown.Item>
								</NavDropdown>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='admin'>
									<LinkContainer to='/admin/users'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/products'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orders'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
