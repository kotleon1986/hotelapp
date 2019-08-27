import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link as RouterLink } from 'react-router-dom';
import {Home, Pageview} from "@material-ui/icons";
import Link from '@material-ui/core/Link';


const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    success: {}
};

class AdminHeader extends Component {

    openSidebar = () => {
        this.props.toggleSidebar(true);
    };

    logout = () => {
        this.props.logoutUser();
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.openSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.grow}>
                            <Link component={RouterLink} color="inherit" to="/admin">
                                <Home />
                            </Link>
                            <Link component={RouterLink} color="inherit" to="/">
                                <Pageview />
                            </Link>
                        </Typography>
                        <Button color="inherit" onClick={this.logout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

AdminHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminHeader);
