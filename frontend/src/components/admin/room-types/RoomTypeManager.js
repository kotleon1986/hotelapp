import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from "../../common/elements/DataTable";
import RoomTypeCreateEdit from "./RoomTypeCreateEdit";

import _ from "lodash";

class RoomTypeManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        };

        this.table = React.createRef();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if (nextProps.roomTypes.submitted !== this.props.roomTypes.submitted && _.isEmpty(nextProps.errors)) {
            this.setState({
                openModal: !nextProps.roomTypes.submitted ? false : this.state.openModal
            });

            if (!nextProps.roomTypes.submitted) {
                this.table.current.getData();
            }
        }

        if (this.props.roomTypes.loading && !nextProps.roomTypes.loading) {
            this.setState({ openModal: true });
        }
    }

    openManagerModal = (id) => {
        if (id) {
            this.props.fetchSingleRoomType(id);
        } else {
            this.props.clearSingleRoomType();
            this.setState({ openModal: true });
        }
    };

    closeManagerModal = () => {
        this.setState({openModal: false});
    };

    handleSubmit = (roomTypeData, id) => {
        this.props.saveSingleRoomType(roomTypeData, id);
    };

    render() {
        const columns = [
            {
                name: 'id',
                label: 'ID#'
            },
            {
                name: 'name',
                label: 'Room Type'
            },
            {
                name: 'created_at',
                label: 'Registered'
            }
        ];

        const {errors} = this.props;
        const {type:roomType, loading, submitted} = this.props.roomTypes;
        const {openModal} = this.state;

        return (
            <div>
                <RoomTypeCreateEdit
                    open={openModal}
                    roomType={roomType}
                    loading={loading}
                    submitted={submitted}
                    errors={errors}
                    handleClose={this.closeManagerModal}
                    handleSubmit={this.handleSubmit}
                />
                <DataTable
                    ref={this.table}
                    title="Room Type Manager"
                    endpoint="admin.roomTypes"
                    columns={columns}
                    add={true}
                    addCallBack={this.openManagerModal}
                    addText={"Create Room Type"}
                    edit={true}
                    editCallBack={this.openManagerModal}
                    delete={true}
                    deleteMessage="Are you sure you wish to delete this room type?"
                    history={this.props.history}
                />
            </div>
        );
    }
}

RoomTypeManager.propTypes = {
    history: PropTypes.object.isRequired
};

export default RoomTypeManager;