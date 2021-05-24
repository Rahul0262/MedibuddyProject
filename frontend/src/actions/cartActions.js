import axios from 'axios';

export const addToCart = (id, qty) => async (dispach, getState) => {
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispach({
			type: 'CART_ADD_ITEM',
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		});
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	} catch (error) {}
};

export const removeFromCart = (id) => async (dispach, getState) => {
	dispach({
		type: 'CART_REMOVE_ITEM',
		payload: {
			product: id,
		},
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispach, getState) => {
	dispach({
		type: 'CART_SAVE_SHIPPING_ADDRESS',
		payload: data,
	});
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};
