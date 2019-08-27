import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Add, ArrowBack, Edit, Save} from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import SubmitButton from "../../common/elements/SubmitButton";
import ImageUpload from "../../common/ImageUpload";
import Api from "../../../services/api/api";

import _ from 'lodash';
import FormHelperText from "@material-ui/core/FormHelperText";

class RoomCreateEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            hotel_id: 1,
            room_type_id: 0,
            image: "",
            file: null,

            hotels: null,
            types: null,
            loading: false,
            submitted: false,
            errors: {}
        };

        this.roomId = (props.page === 'edit') ? props.match.params.id : null
    }

    componentDidMount() {
        this.props.fetchHotelsForSelector();
        this.props.fetchRoomTypesForSelector();

        if (this.roomId) {
            this.props.fetchSingleRoom(this.roomId);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.state.hotels && !_.isEmpty(nextProps.hotel.list)) {
            this.setState({ hotels: nextProps.hotel.list });
            if (!this.state.hotel_id) {
                this.setState({hotel_id: Object.keys(nextProps.hotel.list)[0] });
            }
        }

        if (!this.state.types && !_.isEmpty(nextProps.rooms.types)) {
            this.setState({ types: nextProps.rooms.types });
            if (!this.state.room_type_id) {
                this.setState({room_type_id: Object.keys(nextProps.rooms.types)[0] });
            }
        }

        if ((!this.state.submitted && nextProps.rooms.submitted) ||
            (this.state.submitted && !nextProps.rooms.submitted)) {
                this.setState({ submitted: nextProps.rooms.submitted });
        }

        if ((!this.state.loading && nextProps.rooms.loading) ||
            (this.state.loading && !nextProps.rooms.loading)) {
                this.setState({ loading: nextProps.rooms.loading });
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if (!_.isEmpty(nextProps.rooms.room) && !nextProps.rooms.submitted) {
            const room = nextProps.rooms.room;

            this.setState({
                name: room.name,
                hotel_id: room.hotel_id,
                room_type_id: room.room_type_id,
                image: room.image
            });
        }

        if (!this.roomId && nextProps.rooms.created) {
            this.props.history.push("/admin/rooms");
        }
    }

    getSelectorOptions(entity) {
        return Object.keys(entity).map((id) => {
            return (<MenuItem key={id} value={id}>{entity[id]}</MenuItem>)
        });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        let roomData;
        const data = _.pick(this.state, ['name', 'hotel_id', 'room_type_id']);

        if (this.state.file) {
            roomData = new FormData();
            roomData.append('file', this.state.file);
            Object.keys(data).forEach(key => roomData.append(key, data[key]));
        } else {
            roomData = data;
        }

        this.props.saveRoom(roomData, this.roomId);
    };

    getUploadedFile = (file) => {
        this.setState({file});
    };

    render() {
        const {
            name, hotel_id, room_type_id, image, hotels, types, loading, submitted, errors
        } = this.state;

        const {page} = this.props;

        const pageReady = (!_.isEmpty(hotels) && !_.isEmpty(types)) && (!this.roomId || (this.roomId && !loading));

        return (
            <Container maxWidth={false}>
                <CssBaseline />
                <Paper>
                    <Box marginTop={1} p={1.5} className="dashboard-title" display={"flex"} justifyContent={"space-between"}>
                        <Typography variant="h5" component="h5" align={"left"}>
                            {page === "create" ? <Add /> : <Edit />}
                            <span>{page === 'create' ? "Create Room" : "Edit Room"}</span>
                        </Typography>
                        <Link to={"/admin/rooms"}>
                            <ArrowBack style={{ verticalAlign: "middle" }}/>
                            Back to Rooms
                        </Link>
                    </Box>
                    {!pageReady && <CircularProgress />}
                    {pageReady &&
                    <form encType="multipart/form-data">
                        <Box p={1.5} display="flex" flexDirection="row" justifyContent="flex-start">
                            <Paper square={true}>
                                <div id="room-form" style={{paddingLeft: "10px"}}>
                                    <Box>
                                        <TextField
                                            id="name"
                                            label="Name"
                                            type="text"
                                            name="name"
                                            className="text-fields"
                                            value={name}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            onChange={this.handleChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="hotel_id">Hotel</InputLabel>
                                            <Select
                                                value={hotel_id}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'hotel_id',
                                                    id: 'hotel_id',
                                                }}
                                            >
                                                {this.getSelectorOptions(hotels)}
                                            </Select>
                                            <FormHelperText error={errors && errors.hotel_id}>
                                                {errors.hotel_id}
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="room_type_id">Room Type</InputLabel>
                                            <Select
                                                value={room_type_id}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'room_type_id',
                                                    id: 'room_type_id',
                                                }}
                                            >
                                                {this.getSelectorOptions(types)}
                                            </Select>
                                            <FormHelperText error={errors && errors.room_type_id}>
                                                {errors.room_type_id}
                                            </FormHelperText>
                                        </FormControl>
                                    </Box>
                                    <SubmitButton
                                        icon={<Save />}
                                        text={"Save Room"}
                                        size="medium"
                                        loader={submitted}
                                        submit={this.handleSubmit}
                                    />
                                </div>
                            </Paper>
                            <Paper square={true}>
                                <ImageUpload image={Api.image(image)} handleUpload={this.getUploadedFile} />
                                {
                                    errors && errors.file &&
                                    <FormHelperText error={true} margin={"dense"}>
                                        {errors.file}
                                    </FormHelperText>
                                }
                            </Paper>
                        </Box>
                    </form>
                    }
                </Paper>
            </Container>
        );
    }
}

RoomCreateEdit.propTypes = {
    hotel: PropTypes.object.isRequired,
    fetchHotelsForSelector: PropTypes.func.isRequired,

};

export default RoomCreateEdit;