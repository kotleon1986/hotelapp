import Api from "../../../services/api/api";
import hotelActionTypes from "./types";
import {checkForAdminRoute} from "../../../helpers/string-helper";

export const fetchDetails = () => dispatch => {
    dispatch({type: hotelActionTypes.FETCHING_DETAILS});

    const endpoint = `${checkForAdminRoute()}hotel.details`;
    Api.request(endpoint)
        .then(res => dispatch({type: hotelActionTypes.STORE_DETAILS, payload: res.data}))
        .catch(err => console.log(err))
        .finally(() => dispatch({type: hotelActionTypes.FETCHING_DONE}));
};

export const saveDetails = (hotelId, hotelData) => dispatch => {
    dispatch({type: hotelActionTypes.HOTEL_REQUEST});

    Api.request("admin.hotel.update", hotelId, hotelData)
        .then(res => dispatch({type: hotelActionTypes.STORE_DETAILS, payload: res.data}))
        .catch(err => console.log(err))
        .finally(() => dispatch({type: hotelActionTypes.HOTEL_REQUEST_FINISHED}));
};

export const fetchHotelsForSelector = () => dispatch => {
    Api.request("admin.hotel.list")
        .then((res) => dispatch({type: hotelActionTypes.STORE_HOTELS_LIST, payload: res.data}))
        .catch(err => console.log(err));
};
