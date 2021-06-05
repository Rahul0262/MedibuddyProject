import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store.js';
// import reportWebVitals from './reportWebVitals';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
	(request) => {
		// console.log(request);
		return request;
	},
	(error) => {
		// console.log(error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		// console.log(response);
		return response;
	},
	(error) => {
		// console.log(error);
		return Promise.reject(error);
	}
);
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
