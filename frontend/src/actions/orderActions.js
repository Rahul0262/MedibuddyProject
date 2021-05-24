import axios from 'axios';

export const createOrder = (orders) => async (dispatch, getState) => {
	try {
		dispatch({
			type: 'ORDER_CREATE_REQUEST',
		});
		const {
			login: { userInfo },
		} = getState();
		const { data } = await axios.post(`/api/orders`, orders, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		});

		dispatch({
			type: 'ORDER_CREATE_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'ORDER_CREATE_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
