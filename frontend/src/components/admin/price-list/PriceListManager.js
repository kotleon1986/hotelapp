import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from "../../common/elements/DataTable";
import PriceCreateEdit from "./PriceCreateEdit";

import _ from "lodash";


class PriceListManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        };

        this.table = React.createRef();
    }

    componentDidMount() {
        this.props.fetchRoomTypesForSelector();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.priceList.submitted !== this.props.priceList.submitted && _.isEmpty(nextProps.errors)) {
            this.setState({
                openModal: !nextProps.priceList.submitted ? false : this.state.openModal
            });

            if (!nextProps.priceList.submitted) {
                this.table.current.getData();
            }
        }

        if (this.props.priceList.loading && !nextProps.priceList.loading) {
            this.setState({ openModal: true });
        }
    }

    openManagerModal = (id) => {
        if (id) {
            this.props.fetchSinglePrice(id);
        } else {
            this.props.clearSinglePrice();
            this.setState({ openModal: true });
        }
    };

    closeManagerModal = () => {
        this.setState({openModal: false});
    };

    handleSubmit = (priceData, id) => {
        this.props.savePrice(priceData, id);
    };

    render() {
        const columns = [
            {
                name: 'id',
                label: 'ID#'
            },
            {
                name: 'roomType',
                label: 'Room Type'
            },
            {
                name: 'price',
                label: 'Price, $'
            },
            {
                name: 'created_at',
                label: 'Registered'
            }
        ];

        const { priceList, roomTypes, errors } = this.props;
        const { openModal } = this.state;
        const { single:singlePrice, loading, submitted } = priceList;
        const { list:types } = roomTypes;

        return (
            <div>
                {types && <PriceCreateEdit
                    open={openModal}
                    singlePrice={singlePrice}
                    roomTypes={types}
                    loading={loading}
                    submitted={submitted}
                    errors={errors}
                    handleClose={this.closeManagerModal}
                    handleSubmit={this.handleSubmit}
                />}
                <DataTable
                    ref={this.table}
                    title="Price List Manager"
                    endpoint="admin.priceList"
                    columns={columns}
                    add={!!types}
                    addCallBack={this.openManagerModal}
                    addText={"Create New Price"}
                    edit={true}
                    editCallBack={this.openManagerModal}
                    delete={true}
                    deleteMessage="Are you sure you wish to delete this price?"
                    history={this.props.history}
                />
            </div>
        );
    }
}

PriceListManager.propTypes = {
    history: PropTypes.object.isRequired,
    priceList: PropTypes.object.isRequired,
    roomTypes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchRoomTypesForSelector: PropTypes.func.isRequired,
    fetchSinglePrice: PropTypes.func.isRequired,
    clearSinglePrice: PropTypes.func.isRequired,
    savePrice: PropTypes.func.isRequired
};

export default PriceListManager;

