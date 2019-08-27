import React from "react";
import DataTable from "../../common/elements/DataTable";

const columns = [
    {
        name: 'id',
        label: 'ID#'
    },
    {
        name: 'name',
        label: 'Room Name'
    },
    {
        name: 'hotelName',
        label: 'Hotel Name'
    },
    {
        name: 'roomType',
        label: 'Room Type'
    },
    {
        name: 'created_at',
        label: 'Registered'
    }
];

class RoomsManager extends React.Component {

    render() {
        return (
            <DataTable
                title="Rooms Manager"
                endpoint="admin.rooms"
                columns={columns}
                add={true}
                addText={"Create Room"}
                edit={true}
                delete={true}
                deleteMessage="Are you sure you wish to delete this room?"
                history={this.props.history}
            />
        );
    }
}

export default RoomsManager;