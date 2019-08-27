import commonActionTypes from "./types";

export const clearErrors = () => {
    return {
        type: commonActionTypes.CLEAR_ERRORS
    };
};
