import axios from 'axios';

export const listProducts = () => async (dispach) => {
	try {
		dispach({
			type: 'PRODUCT_LIST_REQUEST',
		});

		const { data } = await axios.get('/api/products');

		dispach({
			type: 'PRODUCT_LIST_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispach({
			type: 'PRODUCT_LIST_FAILED',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
