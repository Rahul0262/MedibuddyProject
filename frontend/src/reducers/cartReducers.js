export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case 'CART_ADD_ITEM':
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		case 'CART_REMOVE_ITEM':
			const itemId = action.payload;
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== itemId.product),
			};
		case 'CART_SAVE_SHIPPING_ADDRESS':
			const address = action.payload;
			return {
				...state,
				shippingAddress: address,
			};
		case 'CART_RESET':
			return {
				cartItems: [],
				shippingAddress: {},
			};
		case 'CART_ONLY_RESET':
			return {
				cartItems: [],
				shippingAddress: state.shippingAddress,
			};
		default:
			return state;
	}
};
