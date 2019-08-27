import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from "../../common/elements/DataTable";
import BookingCreateEdit from "./BookingCreateEdit";

import _ from "lodash";
import moment from "moment";


class BookingManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false
        };

        this.table = React.createRef();
    }

    componentDidMount() {
        this.props.fetchUsersList();
        this.props.fetchRoomsList();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.bookings.submitted !== this.props.bookings.submitted && _.isEmpty(nextProps.errors)) {
            this.setState({
                openModal: !nextProps.bookings.submitted ? false : this.state.openModal
            });

            if (!nextProps.bookings.submitted) {
                this.table.current.getData();
            }
        }

        if (this.props.bookings.loading && !nextProps.bookings.loading) {
            this.setState({ openModal: true });
        }
    }

    openManagerModal = (id) => {
        if (id) {
            this.props.fetchSingleBooking(id);
        } else {
            this.props.clearSingleBooking();
            this.setState({ openModal: true });
        }
    };

    closeManagerModal = () => {
        this.setState({openModal: false});
    };

    handleSubmit = (bookingData, id) => {
        bookingData.start_date = moment(bookingData.start_date).format('YYYY-MM-DD');
        bookingData.end_date = moment(bookingData.end_date).format('YYYY-MM-DD');

        this.props.saveBooking(bookingData, id);
    };

    render() {
        const columns = [
            {
                name: "id",
                label: "ID#"
            },
            {
                name: "name",
                label: "Room"
            },
            {
                name: "customer_fullname",
                label: "Customer Full Name"
            },
            {
                name: "customer_email",
                label: "Customer Email"
            },
            {
                name: "customer_phone",
                label: "Customer Phone"
            },
            {
                name: "start_date",
                label: "Date Start"
            },
            {
                name: "end_date",
                label: "Date End"
            },
            {
                name: "total_nights",
                label: "Total Nights"
            },
            {
                name: "total_price",
                label: "Total Price"
            },
            {
                name: "created_at",
                label: "Registered"
            }
        ];

        const { openModal } = this.state;
        const { history, bookings, rooms, users, errors } = this.props;
        const { list:roomsList } = rooms;
        const { list:usersList } = users;
        const { single:singleBooking, submitted } = bookings;

        return (
            <div>
                <BookingCreateEdit
                    open={openModal}
                    rooms={roomsList}
                    users={usersList}
                    errors={errors}
                    handleClose={this.closeManagerModal}
                    handleSubmit={this.handleSubmit}
                    submitted={submitted}
                    singleBooking={singleBooking}
                />
                <DataTable
                    ref={this.table}
                    title="Bookings Manager"
                    endpoint="admin.bookings"
                    columns={columns}
                    add={!!roomsList && !!usersList}
                    addText={"Create New Booking"}
                    addCallBack={this.openManagerModal}
                    edit={!!roomsList && !!usersList}
                    editCallBack={this.openManagerModal}
                    delete={true}
                    deleteMessage="Are you sure you wish to delete this booking record?"
                    history={history}
                />
            </div>
        );
    }
}

BookingManager.propTypes = {
    history: PropTypes.object.isRequired,
    bookings: PropTypes.object.isRequired,
    rooms: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    fetchUsersList: PropTypes.func.isRequired,
    fetchRoomsList: PropTypes.func.isRequired,
    fetchSingleBooking: PropTypes.func.isRequired,
    clearSingleBooking: PropTypes.func.isRequired,
    saveBooking: PropTypes.func.isRequired,
};

export default BookingManager;