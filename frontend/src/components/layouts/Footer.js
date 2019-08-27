import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";

const styles = {
    stickToBottom: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        backgroundColor: indigo["500"],
        color: grey["50"],
        padding: 5
    }
};

class Footer extends Component {
    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.stickToBottom}>
                Copyright &copy; {new Date().getFullYear()} HotelsApp
            </footer>
        );
    }
}

export default withStyles(styles)(Footer);
