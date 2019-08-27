import { combineReducers } from "redux";
import flashReducer from "./flash";
import errorsReducer from './errors';
import authReducer from "./auth";
import hotelReducer from "./hotel";
import roomsReducer from "./rooms";
import roomTypesReducer from "./room-types";
import priceListReducer from "./price-list";
import bookingsReducer from "./bookings";
import usersReducer from "./users";

export default combineReducers({
    flash: flashReducer,
    errors: errorsReducer,
    auth: authReducer,
    hotel: hotelReducer,
    rooms: roomsReducer,
    roomTypes: roomTypesReducer,
    priceList: priceListReducer,
    bookings: bookingsReducer,
    users: usersReducer
});
