import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Book, Hotel, Money, Room, RoomService} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const styles = {
    list: {
        width: 300
    },
    fullList: {
        width: "auto"
    }
};

const icons = {
    hotel:  <Hotel />,
    room: <Room />,
    roomType: <RoomService />,
    priceList: <Money />,
    booking: <Book />
};

class Sidebar extends React.Component {

    menuItems = [
        {text: "Hotel Details", link: '/hotel', icon: icons.hotel},
        {text: "Room Manager", link: '/rooms', icon: icons.room},
        {text: "Room Type Manager", link: '/room-types', icon: icons.roomType },
        {text: "Price List Manager", link: '/price-list', icon: icons.priceList},
        {text: "Booking Manager", link: '/bookings', icon: icons.booking},
    ];

    closeSidebar = () => {
        this.props.toggleSidebar(false);
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list} onClick={this.closeSidebar} onKeyDown={this.closeSidebar}>
                <List>
                    {this.menuItems.map((item, i) => (
                        <Link to={`/admin${item.link}`} key={i}>
                            <ListItem button key={i}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        </Link>

                    ))}
                </List>
            </div>
        );

        return (
            <Drawer open={this.props.sidebarOpen} onClose={this.closeSidebar}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.closeSidebar}
                    onKeyDown={this.closeSidebar}
                >
                    {sideList}
                </div>
            </Drawer>
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
