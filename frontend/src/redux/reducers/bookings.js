import bookingActionTypes from "../actions/bookings/types";

const initialState = {
    single: null,
    loading: false,
    submitted: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case bookingActionTypes.FETCHING_SINGLE_BOOKING:
            return {
                ...state,
                loading: true
            };

        case bookingActionTypes.FETCHING_FINISHED:
            return {
                ...state,
                loading: false
            };

        case bookingActionTypes.SET_SINGLE_BOOKING:
            return {
                ...state,
                single: action.payload
            };

        case bookingActionTypes.CLEAR_SINGLE_BOOKING:
            return {
                ...state,
                single: null
            };

        case bookingActionTypes.BOOKING_REQUEST:
            return {
                ...state,
                submitted: true
            };

        case bookingActionTypes.BOOKING_REQUEST_FINISHED:
            return {
                ...state,
                submitted: false
            };

        default:
            return state;
    }
}