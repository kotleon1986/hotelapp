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

import _ from "lodash";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

class PriceCreateEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room_type_id: "",
            price: 0,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.submitted) {
           return false;
        }

        if (!this.props.singlePrice && nextProps.singlePrice) {
            this.setState({
                room_type_id: nextProps.singlePrice.room_type_id,
                price: nextProps.singlePrice.price
            });
        } else if (this.props.singlePrice && !nextProps.singlePrice) {
            this.setState({
                room_type_id: "",
                price: 0
            });
        }

        if (nextProps.roomTypes.list) {
            this.setState({
                roomTypes: nextProps.roomTypes.list
            })
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
        const id = this.props.singlePrice ? this.props.singlePrice.id : false;
        const priceData = _.pick(this.state, ['room_type_id', 'price']);
        this.props.handleSubmit(priceData, id);
    };

    getOptionsForSelector(entity) {
        return Object.keys(entity).map((id) => {
            return (<MenuItem key={id} value={id}>{entity[id]}</MenuItem>)
        });
    }

    render() {
        const {open, handleClose, singlePrice, roomTypes, submitted, errors} = this.props;
        const {room_type_id, price} = this.state;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h6"}>
                            {singlePrice && singlePrice.id ? "Update Price" : "Create Price"}
                        </Typography>
                        {submitted && <CircularProgress size={28} /> }
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="room_type_id">Room Type</InputLabel>
                        <Select
                            value={room_type_id}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'room_type_id',
                                id: 'room_type_id',
                            }}
                        >
                            {this.getOptionsForSelector(roomTypes)}
                        </Select>
                        <FormHelperText error={errors && errors.room_type_id}>
                            {errors.room_type_id}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Price"
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        min={0}
                        error={!!errors.price}
                        helperText={errors.price}
                        onChange={this.handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" disabled={submitted}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" disabled={submitted}>
                        Save Price
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}


PriceCreateEdit.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    submitted: PropTypes.bool.isRequired,
    singlePrice: PropTypes.object
};

export default PriceCreateEdit;