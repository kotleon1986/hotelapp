import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router";

import Roles from "./constants/roles";

import PrivateRoute from "./components/common/PrivateRoute";
import Home from "./components/client/Home";
import AdminDashboard from "./components/admin/Dashboard";

import Layout from "./containers/Layout";
import Auth from "./containers/Auth";
import Profile from "./containers/Profile";
import Hotel from "./containers/Hotel";
import Rooms from "./containers/Rooms";
import RoomTypes from "./containers/RoomTypes";
import PriceList from "./containers/PriceList";
import Booking from "./containers/Booking";

class Routes extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    {/*     Home Route    */}
                    <Route exact path="/" component={Home} />

                    {/*     Auth Routes    */}
                    <Route exact path="/login" render={(props) => <Auth page="login" history={props.history} /> } />
                    <Route exact path="/register" render={(props) => <Auth page="register" history={props.history} /> } />

                    {/*     User Routes    */}
                    <Switch>
                        <PrivateRoute exact path="/profile" component={Profile} />
                    </Switch>

                    {/*     Admin Routes    */}
                    <Switch>
                        <PrivateRoute exact path="/admin" roles={[Roles.ADMIN]} component={AdminDashboard} />
                        <PrivateRoute exact path="/admin/hotel" roles={[Roles.ADMIN]} render={(props) => <Hotel page="details" history={props.history} /> } />
                        <PrivateRoute exact path="/admin/rooms" roles={[Roles.ADMIN]} render={(props) => <Rooms page="manager" history={props.history} /> } />
                        <PrivateRoute exact path="/admin/rooms/create" roles={[Roles.ADMIN]} render={(props) => <Rooms page="create" history={props.history} /> } />
                        <PrivateRoute exact path="/admin/rooms/edit/:id" roles={[Roles.ADMIN]} render={(props) => <Rooms page="edit" {...props} /> } />
                        <PrivateRoute exact path="/admin/room-types" roles={[Roles.ADMIN]} render={(props) => <RoomTypes {...props} /> } />
                        <PrivateRoute exact path="/admin/price-list" roles={[Roles.ADMIN]} render={(props) => <PriceList {...props} /> } />
                        <PrivateRoute exact path="/admin/bookings" roles={[Roles.ADMIN]} render={(props) => <Booking {...props} /> } />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default Routes;