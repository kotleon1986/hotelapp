import commonActionTypes from "./types";

// Set Flash Message
export const setFlash = (type, message, callback) => dispatch => {
    dispatch({
        type: commonActionTypes.SET_FLASH,
        payload: {
            type: type,
            message: message,
            callback: callback
        }
    });
};

// Clear Flash Message
export const clearFlash = () => dispatch => {
    dispatch({
        type: commonActionTypes.REMOVE_FLASH
    });
};
