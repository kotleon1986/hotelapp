import hotelActionTypes from "../actions/hotel/types";

const initialState = {
    data: {},
    list: {},
    loading: false,
    submitted: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case hotelActionTypes.FETCHING_DETAILS:
            return {
                ...state,
                loading: true
            };

        case hotelActionTypes.FETCHING_DONE:
            return {
                ...state,
                loading: false
            };

        case hotelActionTypes.STORE_DETAILS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };

        case hotelActionTypes.STORE_HOTELS_LIST:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;
    }
}