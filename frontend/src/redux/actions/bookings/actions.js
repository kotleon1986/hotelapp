import Api from "../../../services/api/api";
import bookingActionTypes from "./types";

export const fetchSingleBooking = (id) => dispatch => {
    dispatch({type: bookingActionTypes.FETCHING_SINGLE_BOOKING });
    Api.request("admin.bookings.get", id)
        .then(res => dispatch({ type: bookingActionTypes.SET_SINGLE_BOOKING, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: bookingActionTypes.FETCHING_FINISHED }));
};

export const clearSingleBooking = () => dispatch => {
    dispatch({ type: bookingActionTypes.CLEAR_SINGLE_BOOKING });
};

export const saveBooking = (bookingData, id) => dispatch => {
    dispatch({ type: bookingActionTypes.BOOKING_REQUEST });

    const endpoint = id ? "admin.bookings.update" : "admin.bookings.create";

    Api.request(endpoint, id, bookingData)
        .then(res => dispatch({ type: bookingActionTypes.SET_SINGLE_BOOKING, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: bookingActionTypes.BOOKING_REQUEST_FINISHED }));
};

