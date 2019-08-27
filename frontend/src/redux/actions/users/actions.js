import Api from "../../../services/api/api";
import userActionTypes from "./types";

export const fetchUsersList = () => dispatch => {
    dispatch({ type: userActionTypes.FETCHING_USERS_LIST });

    Api.request("admin.users.list")
        .then(res => dispatch({ type: userActionTypes.SET_USERS_LIST, payload: res.data }))
        .catch(err => console.log(err))
        .finally(() => dispatch({ type: userActionTypes.FETCHING_FINISHED }));
};