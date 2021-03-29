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
