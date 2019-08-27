import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import RoomTypeManager from "../components/admin/room-types/RoomTypeManager";
import {clearSingleRoomType, fetchSingleRoomType, saveSingleRoomType} from "../redux/actions/room-types/actions";


class RoomTypes extends Component {
    render() {
        const {
            history, roomTypes, errors, fetchSingleRoomType, clearSingleRoomType, saveSingleRoomType
        } = this.props;

        return (
            <div id="room-types-container">
                <RoomTypeManager
                    history={history}
                    roomTypes={roomTypes}
                    errors={errors}
                    fetchSingleRoomType={fetchSingleRoomType}
                    clearSingleRoomType={clearSingleRoomType}
                    saveSingleRoomType={saveSingleRoomType}
                />
            </div>
        );
    }
}

RoomTypes.propTypes = {
    roomTypes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchSingleRoomType: PropTypes.func.isRequired,
    clearSingleRoomType: PropTypes.func.isRequired,
    saveSingleRoomType: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    roomTypes: state.roomTypes,
    errors: state.errors
});

export default connect(mapStateToProps, {
    fetchSingleRoomType, clearSingleRoomType, saveSingleRoomType
})(RoomTypes);


