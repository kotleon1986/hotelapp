import roomTypeActionTypes from "../actions/room-types/types";

const initialState = {
    data: {},
    type: null,
    loading: false,
    submitted: false
};

export default function (state = initialState, action) {
    switch(action.type) {
        case roomTypeActionTypes.FETCHING_ROOM_TYPES:
            return {
                ...state,
                loading: true
            };

        case roomTypeActionTypes.FETCHING_FINISHED:
            return {
                ...state,
                loading: false
            };

        case roomTypeActionTypes.SET_SINGLE_ROOM_TYPE:
            return {
                ...state,
                type: action.payload
            };

        case roomTypeActionTypes.CLEAR_SINGLE_ROOM_TYPE:
            return {
                ...state,
                type: null
            };

        case roomTypeActionTypes.ROOM_TYPE_REQUEST:
            return {
                ...state,
                submitted: true
            };

        case roomTypeActionTypes.ROOM_TYPE_REQUEST_FINISHED:
            return {
                ...state,
                submitted: false
            };

        case roomTypeActionTypes.SET_ROOM_TYPES_LIST:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;
    }
}