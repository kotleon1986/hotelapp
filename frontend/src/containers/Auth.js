import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loginUser, registerUser} from "../redux/actions/auth/actions";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const guestPages = ["login", "register"];

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginPage: (props.page === 'login'),
            registerPage: (props.page === 'register')
        }
    }

    componentWillMount() {
        if (guestPages.indexOf(this.props.page) > -1 && this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const {auth, errors, loginUser, registerUser, history} = this.props;

        return (
            <div id="auth-container">
                { this.state.loginPage && <Login loginUser={loginUser} errors={errors} auth={auth} history={history} />}
                { this.state.registerPage && <Register registerUser={registerUser} errors={errors} auth={auth} history={history} />}

            </div>
        );
    }
}

Auth.propTypes = {
    page: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser, registerUser }
)(Auth);
