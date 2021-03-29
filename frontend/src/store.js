import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { logintReducers } from './reducers/LoginReducers';

const reducer = combineReducers({
	login: logintReducers,
	productList: productListReducer,
	cart: cartReducer,
});

const cartItemsfromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const userInfofromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: {};

//Initial State when app loaded
const initialState = {
	cart: { cartItems: cartItemsfromStorage },
	login: { userInfo: userInfofromStorage },
};

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
