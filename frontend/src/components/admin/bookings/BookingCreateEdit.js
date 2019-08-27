import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {CircularProgress} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import _ from "lodash";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";


class BookingCreateEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            room_id: "",
            full_name: "",
            email: "",
            phone: "",
            start_date: moment().add(1,'days'),
            end_date: moment().add(2,'days'),
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.submitted) {
            return false;
        }

        if (nextProps.singleBooking) {
            let fullName;
            if (nextProps.singleBooking.full_name) {
                fullName = nextProps.singleBooking.full_name;
            } else if (nextProps.singleBooking.user.first_name && nextProps.singleBooking.user.last_name) {
                fullName = `${nextProps.singleBooking.user.first_name} ${nextProps.singleBooking.user.last_name}`;
            } else {
                fullName = "";
            }

            const email = nextProps.singleBooking.email ||
                (nextProps.singleBooking.user ? nextProps.singleBooking.user.email : "");

            const phone = nextProps.singleBooking.phone ||
                (nextProps.singleBooking.user ? nextProps.singleBooking.user.phone : "");

            this.setState({
                user_id: nextProps.singleBooking.user_id || "",
                room_id: nextProps.singleBooking.room_id,
                full_name: fullName,
                email: email,
                phone: phone,
                start_date: nextProps.singleBooking.start_date,
                end_date: nextProps.singleBooking.end_date
            });
        } else if (this.props.singleBooking && !nextProps.singleBooking) {
            this.setState({
                user_id: "",
                room_id: "",
                full_name: "",
                email: "",
                phone: "",
                start_date: moment().add(1,'days'),
                end_date: moment().add(2,'days')
            });
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const id = this.props.singleBooking ? this.props.singleBooking.id : false;
        const bookingData = _.pick(this.state, [
            "user_id", "room_id", "full_name", "email", "phone", "start_date", "end_date"
        ]);
        this.props.handleSubmit(bookingData, id);
    };

    getOptionsForSelector(entity, emptyOption) {
        const options = emptyOption ? [
            (<MenuItem key={0} value="">select none...</MenuItem>)
        ] : [];

        options.push(Object.keys(entity).map((id) => {
            return (<MenuItem key={id} value={id}>{entity[id]}</MenuItem>)
        }));

        return options;
    }

    render() {
        const {open, handleClose, singleBooking, users, rooms, submitted} = this.props;
        const {user_id, room_id, full_name, email, phone, start_date, end_date, errors } = this.state;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h6"}>
                            {singleBooking && singleBooking.id ? "Update Booking" : "Create Booking"}
                        </Typography>
                        {submitted && <CircularProgress size={28} /> }
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="user_id">Select from Users</InputLabel>
                        <Select
                            value={user_id}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'user_id',
                                id: 'user_id',
                            }}
                        >
                            {this.getOptionsForSelector(users, true)}
                        </Select>
                        <FormHelperText error={!!errors.user_id}>
                            {errors.user_id}
                        </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="room_id">Select Room</InputLabel>
                        <Select
                            value={room_id}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'room_id',
                                id: 'room_id',
                            }}
                        >
                            {this.getOptionsForSelector(rooms)}
                        </Select>
                        <FormHelperText error={!!errors.room_id}>
                            {errors.room_id}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Customer Full Name"
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={full_name}
                        error={!!errors.full_name}
                        helperText={errors.full_name}
                        onChange={this.handleChange}
                        disabled={!!Number(user_id)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Customer Email"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={this.handleChange}
                        disabled={!!Number(user_id)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Customer Phone"
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        onChange={this.handleChange}
                        disabled={!!Number(user_id)}
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="start_date"
                            name="start_date"
                            label="Date Start"
                            value={start_date || moment().add(1,'days')}
                            onChange={(startDate) => this.handleChange({target: {name: "start_date", value: moment(startDate).toDate()} })}
                            fullWidth
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <FormHelperText error={!!errors.start_date}>
                            {errors.start_date}
                        </FormHelperText>
                        <KeyboardDatePicker
                            margin="normal"
                            id="end_date"
                            name="end_date"
                            label="Date End"
                            value={end_date || moment().add(2,'days')}
                            onChange={(endDate) => this.handleChange({target: {name: "end_date", value: moment(endDate).toDate()} })}
                            fullWidth
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <FormHelperText error={!!errors.end_date}>
                            {errors.end_date}
                        </FormHelperText>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" disabled={submitted}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" disabled={submitted}>
                        Save Booking
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}


BookingCreateEdit.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    singleBooking: PropTypes.object
};

export default BookingCreateEdit;