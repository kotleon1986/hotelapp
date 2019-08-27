import commonActionTypes from './../actions/common/types';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case commonActionTypes.SET_ERRORS:
            return action.payload;
        case commonActionTypes.CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}
