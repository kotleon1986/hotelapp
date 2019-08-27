import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import PriceListManager from "../components/admin/price-list/PriceListManager";
import {fetchRoomTypesForSelector} from "../redux/actions/room-types/actions";
import {clearSinglePrice, fetchSinglePrice, savePrice} from "../redux/actions/price-list/actions";

class PriceList extends Component {
    render() {
        const {
            priceList, roomTypes, errors, history, fetchRoomTypesForSelector,
            fetchSinglePrice, clearSinglePrice, savePrice
        } = this.props;

        return (
            <div id="price-list-container">
                <PriceListManager
                    priceList={priceList}
                    roomTypes={roomTypes}
                    errors={errors}
                    history={history}
                    fetchRoomTypesForSelector={fetchRoomTypesForSelector}
                    fetchSinglePrice={fetchSinglePrice}
                    clearSinglePrice={clearSinglePrice}
                    savePrice={savePrice}
                />
            </div>
        );
    }
}

PriceList.propTypes = {
    priceList: PropTypes.object.isRequired,
    roomTypes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    priceList: state.priceList,
    roomTypes: state.roomTypes,
    errors: state.errors,
    fetchRoomTypesForSelector: PropTypes.func.isRequired,
    fetchSinglePrice: PropTypes.func.isRequired,
    clearSinglePrice: PropTypes.func.isRequired,
    savePrice: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {
    fetchRoomTypesForSelector,
    fetchSinglePrice,
    clearSinglePrice,
    savePrice
})(PriceList);