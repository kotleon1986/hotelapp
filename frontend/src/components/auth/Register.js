import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
import SubmitButton from "../common/elements/SubmitButton";

const styles = {
    main: {
        width: "400px",
        margin: "auto",
        display: "block"
    },
    paper: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 24px 24px"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    submit: {
        marginTop: 30
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loader: false,
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        this.setLoader(nextProps.auth.submitted);

        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.registerUser(userData);
    };

    setLoader(submitted) {
        return this.setState({loader: submitted});
    }

    render() {
        const { classes } = this.props;
        const { errors, loader } = this.state;

        return (
            <div className={classes.submit}>
                <main className={classes.main}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <Person />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form}>
                            <TextField
                                autoFocus
                                fullWidth
                                type="text"
                                id="email"
                                name="email"
                                error={!!errors.email}
                                label="Email Address"
                                helperText={errors.email}
                                onChange={this.onChange}
                            />

                            <TextField
                                autoFocus
                                fullWidth
                                type="password"
                                id="password"
                                name="password"
                                label="Password"
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={this.onChange}
                            />

                            <SubmitButton
                                text={"Sign Up"}
                                loader={loader}
                                className={classes.submit}
                                submit={this.onSubmit}
                            />
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
