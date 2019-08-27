import store from "./../redux/store";
import commonActionTypes from "../redux/actions/common/types";

const StoreHelper = {
    clearErrors() {
        store.dispatch({
            type: commonActionTypes.CLEAR_ERRORS
        });
    },

    setErrors(errors) {
        store.dispatch({
            type: commonActionTypes.SET_ERRORS,
            payload: errors
        });
    },

    setFlash(response) {
        const flash = { message: response.message };
        flash.type = response.info
            ? "info"
            : response.warning
                ? "warning"
                : response.success
                    ? "success"
                    : "error";

        store.dispatch({
            type: commonActionTypes.SET_FLASH,
            payload: flash
        });
    }
};

export default StoreHelper;
