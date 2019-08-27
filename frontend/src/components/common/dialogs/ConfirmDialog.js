import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import {Warning} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const ConfirmDialog = (props) => (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            <Box display="flex" justifyContent={"space-between"}>
                <Typography>
                    <Warning />
                    <span>Attention</span>
                </Typography>
                {props.loader && <CircularProgress size={28} />}
            </Box>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.handleClose(false)} color="default" disabled={props.loader}>
                No
            </Button>
            <Button onClick={() => props.handleClose(true)} color="primary" autoFocus disabled={props.loader}>
                Yes
            </Button>
        </DialogActions>
    </Dialog>
);


ConfirmDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ConfirmDialog;