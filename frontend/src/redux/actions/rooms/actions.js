import Api from "../../../services/api/api";
import roomActionTypes from "./types";

export const fetchRoomTypesForSelector = () => dispatch => {
    Api.request("admin.roomTypes.list")
        .then(res => dispatch({type: roomActionTypes.FETCH_ROOM_TYPES_LIST, payload: res.data}))
        .catch(err => console.log(err));
};

export const fetchSingleRoom = (id) => dispatch => {
    dispatch({ type: roomActionTypes.FETCH_ROOM });

    Api.request("admin.rooms.get", id)
        .then(res => dispatch({ type: roomActionTypes.SET_SINGLE_ROOM, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomActionTypes.FETCHING_FINISHED }));
};

export const saveRoom = (roomData, id) => dispatch => {
    const endpoint = id ? "admin.rooms.update" : "admin.rooms.create";
    const endAction = id ? roomActionTypes.ROOM_UPDATED : roomActionTypes.ROOM_CREATED;

    dispatch({ type: roomActionTypes.ROOM_REQUEST });
    Api.request(endpoint, id, roomData)
        .then(() => dispatch({ type: endAction }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomActionTypes.ROOM_REQUEST_FINISHED }));
};

export const fetchRoomsList = () => dispatch => {
    dispatch({ type: roomActionTypes.FETCHING_ROOMS_LIST });

    Api.request("admin.rooms.list")
        .then(res => dispatch({ type: roomActionTypes.SET_ROOMS_LIST, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: roomActionTypes.FETCHING_ROOMS_LIST }));
};