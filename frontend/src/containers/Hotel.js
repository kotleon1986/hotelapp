import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchDetails, saveDetails} from "../redux/actions/hotel/actions";
import {connect} from "react-redux";
import HotelDetails from "../components/admin/hotel/HotelDetails";

class Hotel extends Component {

    render() {
        const {page, hotel, errors, fetchDetails, saveDetails} = this.props;

        return (
            <div id="hotel-container">
                {page === "details" && <HotelDetails hotel={hotel} fetchDetails={fetchDetails} saveDetails={saveDetails} errors={errors} />}
            </div>
        );
    }
}

Hotel.propTypes = {
    hotel: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchDetails: PropTypes.func.isRequired,
    saveDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    hotel: state.hotel,
    errors: state.errors
});

export default connect(mapStateToProps, { fetchDetails, saveDetails })(Hotel);