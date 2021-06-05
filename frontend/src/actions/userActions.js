import axios from 'axios';

export const loginUser = (email, password) => async (dispatch, getState) => {
	try {
		//login requested and dispatched
		dispatch({
			type: 'USER_LOGIN_REQUEST',
		});

		const { data } = await axios.post(
			'/api/users/login',
			{
				email,
				password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		//login success and then store the response into the localstorage
		dispatch({
			type: 'USER_LOGIN_SUCCESS',
			payload: data,
		});
		dispatch({
			type: 'USER_DETAILS_SUCCESS',
			payload: {
				_id: data._id,
				name: data.name,
				email: data.email,
				isAdmin: data.isAdmin,
			},
		});
		localStorage.setItem('user', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: 'USER_LOGIN_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logoutUser = () => async (dispatch) => {
	localStorage.removeItem('user');
	localStorage.removeItem('cartItems');
	localStorage.removeItem('shippingAddress');
	dispatch({
		type: 'USER_LOGOUT',
	});
	dispatch({
		type: 'CART_RESET',
	});
};

export const registerUser =
	(name, email, password) => async (dispatch, getState) => {
		try {
			//login requested and dispatched
			dispatch({
				type: 'USER_REGISTER_REQUEST',
			});

			const { data } = await axios.post(
				'/api/users/register',
				{
					name,
					email,
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			//login success and then store the response into the localstorage
			dispatch({
				type: 'USER_REGISTER_SUCCESS',
				payload: data,
			});
			dispatch({
				type: 'USER_LOGIN_SUCCESS',
				payload: data,
			});
			localStorage.setItem('user', JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: 'USER_REGISTER_FAILED',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getUserProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'USER_DETAILS_REQUEST',
		});
		const {
			login: { userInfo },
		} = getState();
		const { data } = await axios.get(`/api/users/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		});

		dispatch({
			type: 'USER_DETAILS_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'USER_DETAILS_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'USER_UPDATE_REQUEST',
		});
		const {
			login: { userInfo },
		} = getState();
		const { data } = await axios.put(`/api/users/profile`, user, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		});

		dispatch({
			type: 'USER_UPDATE_SUCCESS',
			payload: data,
		});
		dispatch({
			type: 'USER_LOGIN_SUCCESS',
			payload: data,
		});
		dispatch({
			type: 'USER_DETAILS_SUCCESS',
			payload: {
				_id: data._id,
				name: data.name,
				email: data.email,
				isAdmin: data.isAdmin,
			},
		});
		localStorage.setItem('user', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: 'USER_UPDATE_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
