import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {connect} from "react-redux";
import {clearFlash} from "../redux/actions/common/flash";
import {logoutUser, authorizeUser} from "../redux/actions/auth/actions";

import Header from "./../components/layouts/Header";
import AdminHeader from './../components/layouts/AdminHeader';
import Sidebar from "./../components/layouts/Sidebar";
import Footer from "./../components/layouts/Footer";
import Flash from "../components/layouts/Flash";
import Roles from "../constants/roles";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false,
            showAdminHeader: false,
            showContent: false,
        };
    }

    componentDidMount() {
        this.props.authorizeUser();
        this.showContent();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.isAuthenticated && nextProps.auth.user.role === Roles.ADMIN) {
            this.setState({ showAdminHeader: true});
        } else {
            this.setState({ showAdminHeader: false});
        }
    }

    toggleSidebar = state => {
        this.setState({ sidebarOpen: state });
    };

    showContent = () => {
        this.setState({ showContent: true });
    };

    header() {
        const {auth, logoutUser} = this.props;
        const {sidebarOpen} = this.state;

        return (
            (this.state.showAdminHeader) ? (
                <nav>
                    <AdminHeader isAuthenticated={auth.isAuthenticated} toggleSidebar={this.toggleSidebar} logoutUser={logoutUser} />
                    <Sidebar toggleSidebar={this.toggleSidebar} sidebarOpen={sidebarOpen} />
                </nav>
            ) : (
                <Header isAuthenticated={auth.isAuthenticated} logoutUser={logoutUser} />
            )
        )
    }

    render() {
        const {showContent} = this.state;
        return (
            <div id="hotels-app" hidden={!this.state.showContent}>
                <Flash flash={this.props.flash} clearFlash={this.props.clearFlash} />

                {this.header()}

                <div id="main-container">
                    {showContent ? this.props.children : ''}
                </div>

                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    clearFlash: PropTypes.func.isRequired,
    flash: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    flash: state.flash
});

export default connect(
    mapStateToProps,
    {clearFlash, logoutUser, authorizeUser}
)(withRouter(Layout));