import userActionTypes from "../actions/users/types";

const initialState = {
    list: {},
    loading: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case userActionTypes.FETCHING_USERS_LIST:
            return {
                ...state,
                loading: true
            };

        case userActionTypes.FETCHING_FINISHED:
            return {
                ...state,
                loading: false
            };

        case userActionTypes.SET_USERS_LIST:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;
    }
}