import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {fetchHotelsForSelector} from "../redux/actions/hotel/actions";
import {fetchRoomTypesForSelector, fetchSingleRoom, saveRoom} from "../redux/actions/rooms/actions";

import RoomsManager from "../components/admin/rooms/RoomsManager";
import RoomCreateEdit from "../components/admin/rooms/RoomCreateEdit";


class Rooms extends Component {

    render() {
        const {
            page, history, match, hotel, rooms, errors, fetchHotelsForSelector,
            fetchRoomTypesForSelector, fetchSingleRoom, saveRoom
        } = this.props;

        return (
            <div id="rooms-container">
                {page === 'manager' && <RoomsManager history={history} />}
                {
                    (page === 'create' || page === 'edit') &&
                    <RoomCreateEdit
                        history={history}
                        match={match}
                        page={page}
                        hotel={hotel}
                        rooms={rooms}
                        errors={errors}
                        fetchHotelsForSelector={fetchHotelsForSelector}
                        fetchRoomTypesForSelector={fetchRoomTypesForSelector}
                        fetchSingleRoom={fetchSingleRoom}
                        saveRoom={saveRoom}
                    />
                }
            </div>
        );
    }

}

Rooms.propTypes = {
    hotel: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchHotelsForSelector: PropTypes.func.isRequired,
    fetchRoomTypesForSelector: PropTypes.func.isRequired,
    saveRoom: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    hotel: state.hotel,
    rooms: state.rooms,
    errors: state.errors
});

export default connect(mapStateToProps, {
    fetchHotelsForSelector,
    fetchRoomTypesForSelector,
    fetchSingleRoom,
    saveRoom
})(Rooms);