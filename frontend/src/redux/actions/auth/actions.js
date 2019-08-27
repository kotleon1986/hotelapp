import Api from "./../../../services/api/api";
import StorageHelper from "../../../helpers/storage-helper";
import authActionTypes from "./types";

export const loginUser = userData => dispatch => {
    dispatch({ type: authActionTypes.AUTH_REQUEST });
    Api.request("auth.login", userData)
        .then(res => {
            const { token } = res.data;

            storeUserDataFromToken(token, dispatch);
        })
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: authActionTypes.AUTH_REQUEST_FINISHED }));
};

export const registerUser = userData => dispatch => {
  dispatch({ type: authActionTypes.AUTH_REQUEST });
  Api.request("auth.register", userData)
      .then(res => {
          const { token } = res.data;

          storeUserDataFromToken(token, dispatch);
      })
      .catch(err => console.log(err))
      .finally(() => dispatch({ type: authActionTypes.AUTH_REQUEST_FINISHED }));
};

export const logoutUser = () => dispatch => {
    StorageHelper.removeToken();
    dispatch({
        type: authActionTypes.LOGOUT_USER
    });
};

export const saveProfile = (userData) => dispatch => {
    dispatch({ type: authActionTypes.AUTH_REQUEST });
    Api.request("auth.profile", userData)
        .then(res => {
            const { token } = res.data;

            storeUserDataFromToken(token, dispatch);
        })
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: authActionTypes.AUTH_REQUEST_FINISHED }));
};

export const storeUserDataFromToken = (token, dispatch) => {
    StorageHelper.setToken(token);

    Api.setAuthToken(token);

    dispatch(setCurrentUser(StorageHelper.getUserFromToken()));
};

export const authorizeUser = () => dispatch => {
    const token = StorageHelper.getToken();
    if (!token) return false;

    const user = StorageHelper.getUserFromToken();

    if (StorageHelper.tokenExpired()) {
        StorageHelper.removeToken();
        logoutUser();
        return false;
    }

    storeUserDataFromToken(token, dispatch);

    return user;
};

export const setCurrentUser = user => {
    return {
        type: authActionTypes.SET_CURRENT_USER,
        payload: user
    };
};
