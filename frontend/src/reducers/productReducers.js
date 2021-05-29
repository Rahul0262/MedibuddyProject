export const productListReducer = (
	state = { products: [], topProducts: [] },
	action
) => {
	switch (action.type) {
		case 'PRODUCT_LIST_REQUEST':
			return { loading: true, products: [], topProducts: [] };
		case 'PRODUCT_LIST_SUCCESS':
			return {
				loading: false,
				products: action.payload.products,
				topProducts: action.payload.topProducts,
			};
		case 'PRODUCT_LIST_FAILED':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
