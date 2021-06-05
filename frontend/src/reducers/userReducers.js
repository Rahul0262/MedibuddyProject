export const logintReducers = (state = {}, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return { loading: true };
		case 'USER_LOGIN_SUCCESS':
			return { loading: false, userInfo: action.payload };
		case 'USER_LOGIN_FAILED':
			return { loading: false, error: action.payload };
		case 'USER_LOGOUT':
			return {};
		default:
			return state;
	}
};

export const registerReducers = (state = {}, action) => {
	switch (action.type) {
		case 'USER_REGISTER_REQUEST':
			return { loading: true };
		case 'USER_REGISTER_SUCCESS':
			return { loading: false, userInfo: action.payload };
		case 'USER_REGISTER_FAILED':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userDetailsReducers = (state = { user: {} }, action) => {
	switch (action.type) {
		case 'USER_DETAILS_REQUEST':
			return { ...state, loading: true };
		case 'USER_DETAILS_SUCCESS':
			return { loading: false, user: action.payload };
		case 'USER_DETAILS_FAILED':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducers = (state = {}, action) => {
	switch (action.type) {
		case 'USER_UPDATE_REQUEST':
			return { loading: true };
		case 'USER_UPDATE_SUCCESS':
			return { loading: false, success: true, userInfo: action.payload };
		case 'USER_UPDATE_FAILED':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
