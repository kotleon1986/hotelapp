import React from 'react';
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import StorageHelper from "../../helpers/storage-helper";

const PrivateRoute = ({auth, roles, path, ...rest}) => userAuthorized(auth, roles) ?  <Route {...rest} /> : <Redirect to="/login" />;

const userAuthorized = (auth, roles) => (auth.isAuthenticated && StorageHelper.userHasRole(roles));

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);