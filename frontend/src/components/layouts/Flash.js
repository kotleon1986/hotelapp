import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import WarningIcon from "@material-ui/icons/Warning";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import { withStyles } from "@material-ui/core/styles";

const flashIcons = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const styles = {
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: red[500]
    },
    info: {
        backgroundColor: blue[500]
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 5
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
};

class Flash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.flash.message.length) {
            this.setState({
                open: true
            });
        }
    }

    onFlashClose = () => {
        this.setState({
            open: false
        });
        this.props.clearFlash();
    };

    render() {
        const { classes, flash } = this.props;
        if (!flash.type.length) {
            return false;
        }

        const Icon = flashIcons[flash.type];

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.onFlashClose}
            >
                <SnackbarContent
                    className={classNames(classes[flash.type])}
                    message={
                        <span id="client-snackbar" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
                            {flash.message}
            </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.onFlashClose}
                        >
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    ]}
                />
            </Snackbar>
        );
    }
}

Flash.propTypes = {
    classes: PropTypes.object.isRequired,
    flash: PropTypes.object.isRequired,
    clearFlash: PropTypes.func.isRequired
};

export default withStyles(styles)(Flash);
