import Api from "../../../services/api/api";
import priceListActionTypes from "./types";

export const fetchSinglePrice = (id) => dispatch => {
    dispatch({type: priceListActionTypes.FETCHING_PRICE_LIST });
    Api.request("admin.priceList.get", id)
        .then(res => dispatch({ type: priceListActionTypes.SET_SINGLE_PRICE, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: priceListActionTypes.FETCHING_FINISHED }));
};

export const clearSinglePrice = () => dispatch => {
    dispatch({ type: priceListActionTypes.CLEAR_SINGLE_PRICE });
};

export const savePrice = (priceData, id) => dispatch => {
    dispatch({ type: priceListActionTypes.PRICE_REQUEST });

    const endpoint = id ? "admin.priceList.update" : "admin.priceList.create";

    Api.request(endpoint, id, priceData)
        .then(res => dispatch({ type: priceListActionTypes.SET_SINGLE_PRICE, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: priceListActionTypes.PRICE_REQUEST_FINISHED }));
};

