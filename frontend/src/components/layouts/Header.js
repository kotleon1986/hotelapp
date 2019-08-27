import React, {Component} from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { Link as RouterLink } from 'react-router-dom';
import {AccountCircle, Home} from "@material-ui/icons";
import Link from '@material-ui/core/Link';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            anchorEl: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated && !this.state.loggedIn) {
            this.setLoggedIn(true);
        }

        if (!nextProps.isAuthenticated && this.state.loggedIn) {
            this.setLoggedIn(false);
        }
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    setLoggedIn(loggedIn) {
        this.setState({loggedIn: loggedIn});
    };

    logoutUser = () => {
        this.props.logoutUser();
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        const { loggedIn } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.grow}>
                            <Link component={RouterLink} color="inherit" to="/">
                                <Home />
                            </Link>
                        </Typography>
                        {loggedIn ? (
                            <div>
                                <IconButton
                                    aria-label="Account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={!!this.state.anchorEl}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <Link component={RouterLink} color="inherit" to="/profile">
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
                                </Menu>
                            </div>
                            ) : (
                                <Link component={RouterLink} color="inherit" to="/login">
                                    LOGIN
                                </Link>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);