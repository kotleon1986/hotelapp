import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Box from "@material-ui/core/Box";
import SubmitButton from "../common/elements/SubmitButton";
import Roles from "../../constants/roles";

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

class Login extends Component {
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
            if (nextProps.auth.user.role === Roles.ADMIN) {
                this.props.history.push("/admin");
            } else {
                this.props.history.push("/");
            }
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

        this.props.loginUser(userData);
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
                        <Avatar>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
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
                                text={"Sign In"}
                                loader={loader}
                                className={classes.submit}
                                submit={this.onSubmit}
                            />
                        </form>
                        <Box marginTop={1}>
                            <Link component={RouterLink} to={'/register'}>
                                Create new account
                            </Link>
                        </Box>
                    </Paper>
                </main>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
};

export default withStyles(styles)(Login);
