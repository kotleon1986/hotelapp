import Api from "../../../services/api/api";
import roomTypeActionTypes from "./types";

export const fetchSingleRoomType = (id) => dispatch => {
    dispatch({type: roomTypeActionTypes.FETCHING_ROOM_TYPES });
    Api.request("admin.roomTypes.get", id)
        .then(res => dispatch({ type: roomTypeActionTypes.SET_SINGLE_ROOM_TYPE, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomTypeActionTypes.FETCHING_FINISHED }));
};

export const clearSingleRoomType = () => dispatch => {
    dispatch({ type: roomTypeActionTypes.CLEAR_SINGLE_ROOM_TYPE });
};

export const saveSingleRoomType = (roomTypeData, id) => dispatch => {
    dispatch({ type: roomTypeActionTypes.ROOM_TYPE_REQUEST });

    const endpoint = id ? "admin.roomTypes.update" : "admin.roomTypes.create";

    Api.request(endpoint, id, roomTypeData)
        .then(res => dispatch({ type: roomTypeActionTypes.SET_SINGLE_ROOM_TYPE, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomTypeActionTypes.ROOM_TYPE_REQUEST_FINISHED }));
};

export const fetchRoomTypesForSelector = () => dispatch => {
    dispatch({ type: roomTypeActionTypes.FETCHING_ROOM_TYPES });
    Api.request("admin.roomTypes.list")
        .then(res => dispatch({ type: roomTypeActionTypes.SET_ROOM_TYPES_LIST, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomTypeActionTypes.FETCHING_FINISHED }));
};