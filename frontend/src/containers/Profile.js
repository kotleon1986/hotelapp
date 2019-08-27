import React, {Component} from 'react';
import {connect} from "react-redux";
import {saveProfile} from "../redux/actions/auth/actions";

import ProfileComponent from './../components/auth/Profile';

class Profile extends Component {
    render() {
        const {auth, errors, saveProfile} = this.props;

        return (
            <ProfileComponent auth={auth} errors={errors} saveProfile={saveProfile} />
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {
    saveProfile
})(Profile);