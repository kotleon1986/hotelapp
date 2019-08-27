import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookingManager from "../components/admin/bookings/BookingManager";
import {connect} from "react-redux";
import {fetchUsersList} from "../redux/actions/users/actions";
import {fetchRoomsList} from "../redux/actions/rooms/actions";
import {clearSingleBooking, fetchSingleBooking, saveBooking} from "../redux/actions/bookings/actions";

class Booking extends Component {
    render() {
        const {
            history, bookings, rooms, users, errors, fetchUsersList, fetchRoomsList,
            fetchSingleBooking, clearSingleBooking, saveBooking
        } = this.props;

        return (
            <BookingManager
                history={history}
                bookings={bookings}
                rooms={rooms}
                users={users}
                errors={errors}
                fetchUsersList={fetchUsersList}
                fetchRoomsList={fetchRoomsList}
                fetchSingleBooking={fetchSingleBooking}
                clearSingleBooking={clearSingleBooking}
                saveBooking={saveBooking}
            />
        );
    }
}

Booking.propTypes = {
    bookings: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchUsersList: PropTypes.func.isRequired,
    fetchRoomsList: PropTypes.func.isRequired,
    fetchSingleBooking: PropTypes.func.isRequired,
    clearSingleBooking: PropTypes.func.isRequired,
    saveBooking: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    bookings: state.bookings,
    rooms: state.rooms,
    users: state.users,
    errors: state.errors
});

export default connect(mapStateToProps, {
    fetchUsersList,
    fetchRoomsList,
    fetchSingleBooking,
    clearSingleBooking,
    saveBooking
})(Booking);