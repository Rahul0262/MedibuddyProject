import axios from 'axios';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: 'PRODUCT_LIST_REQUEST',
		});

		const { data } = await axios.get('/api/products');
		const topProducts = [...data]
			.sort((a, b) => b.rating - a.rating)
			.slice(0, 3);
		dispatch({
			type: 'PRODUCT_LIST_SUCCESS',
			payload: {
				products: data,
				topProducts,
			},
		});
	} catch (error) {
		dispatch({
			type: 'PRODUCT_LIST_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
