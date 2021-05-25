import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Row, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersListScreen = ({ history }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [server, setServer] = useState(true);
	const [error, setError] = useState('');

	const login = useSelector((state) => state.login);
	const { userInfo } = login;
	const fetchAllUsers = async () => {
		axios
			.get(`/api/users/allusers`, {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			})
			.then((res) => {
				setUsers(res.data);
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
		if (userInfo && userInfo.isAdmin) {
			fetchAllUsers();
		} else {
			history.push('/');
		}
	}, [userInfo]);

	const deleteUserHandler = (id) => {
		console.log('delete', id);
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
				<Col className='text-center'>
					<h1> Users </h1>
					{loading ? (
						<Row className='mt-4'>
							<Col sm={12} className='text-center'>
								<Spinner animation='border' />
							</Col>
						</Row>
					) : users.length === 0 ? (
						<div className='my-3'>
							<h6>Oops!! No Users yet</h6>
						</div>
					) : (
						<Table striped bordered size='sm' className='mt-4'>
							<thead>
								<tr>
									<th>User Id</th>
									<th>Name</th>
									<th>Email</th>
									<th>Admin</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users.map((item, index) => (
									<tr key={index}>
										<td>{item._id}</td>
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>
											{item.isAdmin ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												></i>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												></i>
											)}
										</td>
										<td>
											<Link to={`/user/${item._id}/edit`}>
												<Button variant='light' size='sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</Link>
											<Button
												variant='danger'
												size='sm'
												onClick={() => deleteUserHandler(item._id)}
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

export default UsersListScreen;
