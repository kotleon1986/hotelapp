import authActionTypes from "../actions/auth/types";

const initialState = {
    user: {},
    submitted: false,
    isAuthenticated: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case authActionTypes.AUTH_REQUEST:
            return {
                ...state,
                submitted: true
            };

        case authActionTypes.AUTH_REQUEST_FINISHED:
            return {
                ...state,
                submitted: false
            };

        case authActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload
            };

        case authActionTypes.LOGOUT_USER:
            return initialState;

        default:
            return state;
    }
}
