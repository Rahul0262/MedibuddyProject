import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer } from './reducers/orderReducers';
import {
	logintReducers,
	registerReducers,
	userDetailsReducers,
	userUpdateReducers,
} from './reducers/userReducers';

const reducer = combineReducers({
	login: logintReducers,
	productList: productListReducer,
	cart: cartReducer,
	register: registerReducers,
	userDetails: userDetailsReducers,
	userUpdate: userUpdateReducers,
	orderCreate: orderCreateReducer,
});

const cartItemsfromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const userInfofromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: {}; //ikkada null return cheyyali else condition lo
const shippingAddfromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

//Initial State when app loaded
const initialState = {
	cart: {
		cartItems: cartItemsfromStorage,
		shippingAddress: shippingAddfromStorage,
	},
	login: { userInfo: userInfofromStorage },
};

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
