import commonActionTypes from "../actions/common/types";

const initialState = {
    type: "",
    message: "",
    callback: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case commonActionTypes.SET_FLASH:
            return action.payload;

        case commonActionTypes.REMOVE_FLASH:
            return initialState;

        default:
            return state;
    }
}
