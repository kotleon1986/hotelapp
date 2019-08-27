import priceListActionTypes from "../actions/price-list/types";

const initialState = {
    data: null,
    single: null,
    loading: false,
    submitted: false
};

export default function (state = initialState, action) {

    switch(action.type) {
        case priceListActionTypes.FETCHING_PRICE_LIST:
            return {
                ...state,
                loading: true
            };

        case priceListActionTypes.FETCHING_FINISHED:
            return {
                ...state,
                loading: false
            };

        case priceListActionTypes.SET_SINGLE_PRICE:
            return {
                ...state,
                single: action.payload
            };

        case priceListActionTypes.PRICE_REQUEST:
            return {
                ...state,
                submitted: true
            };

        case priceListActionTypes.PRICE_REQUEST_FINISHED:
            return {
                ...state,
                submitted: false
            };

        default:
            return state;
    }

}