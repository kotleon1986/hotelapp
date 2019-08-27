import roomActionTypes from "../actions/rooms/types";

const initialState = {
    data: {},
    list: {},
    types: {},
    room: {},
    loading: false,
    submitted: false,
    created: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case roomActionTypes.FETCH_ROOM_TYPES_LIST:
            return {
                ...state,
                types: action.payload
            };

        case roomActionTypes.ROOM_REQUEST:
            return {
                ...state,
                submitted: true
            };

        case roomActionTypes.ROOM_REQUEST_FINISHED:
            return {
                ...state,
                submitted: false
            };

        case roomActionTypes.ROOM_CREATED:
            return {
                ...state,
                created: true
            };

        case roomActionTypes.ROOM_UPDATED:
            return {
                ...state,
                room: action.payload
            };

        case roomActionTypes.FETCH_ROOM:
            return {
                ...state,
                loading: true
            };

        case roomActionTypes.FETCHING_FINISHED:
            return {
                ...state,
                loading: false
            };

        case roomActionTypes.SET_SINGLE_ROOM:
            return {
                ...state,
                room: action.payload
            };

        case roomActionTypes.SET_ROOMS_LIST:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;

    }
}
