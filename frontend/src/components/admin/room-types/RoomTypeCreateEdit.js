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


class RoomTypeCreateEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if (nextProps.submitted) {
           return false;
        }

        if (nextProps.roomType) {
            this.setState({name: nextProps.roomType.name});
        } else {
            this.setState({name: ""});
        }
    }

    handleChange = e => {
        this.setState({name: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const id = this.props.roomType ? this.props.roomType.id : false;
        this.props.handleSubmit({name: this.state.name}, id);
    };

    render() {
        const {open, handleClose, roomType, submitted} = this.props;
        const {name, errors} = this.state;

        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">
                    <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography variant={"h6"}>
                            {roomType && roomType.id ? "Update Room Type" : "Create Room Type"}
                        </Typography>
                        {submitted && <CircularProgress size={28} /> }
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        error={errors && errors.name}
                        helperText={errors ? errors.name : ""}
                        onChange={this.handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default" disabled={submitted}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary" disabled={submitted}>
                        Save Type
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}


RoomTypeCreateEdit.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitted: PropTypes.bool.isRequired,
};

export default RoomTypeCreateEdit;