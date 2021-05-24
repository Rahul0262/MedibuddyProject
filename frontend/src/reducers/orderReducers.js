export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ORDER_CREATE_REQUEST':
			return { loading: true };
		case 'ORDER_CREATE_SUCCESS':
			return {
				order: action.payload,
				loading: false,
				success: true,
			};
		case 'ORDER_CREATE_FALIED':
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
