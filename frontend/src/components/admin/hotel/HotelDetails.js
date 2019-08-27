import React, {Component} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import _ from 'lodash';
import Api from "../../../services/api/api";

import SubmitButton from "../../common/elements/SubmitButton";
import ImageUpload from "../../common/ImageUpload";
import {Edit, Save} from "@material-ui/icons";

class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.hotel.data,
            file: null,
            showForm: false,
            errors: {},
            loading: false,
            submitted: false
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.hotel.loading !== this.state.loading) {
            this.setState({loading: nextProps.hotel.loading});
        }

        if (nextProps.hotel.submitted !== this.state.submitted) {
            this.setState({submitted: nextProps.hotel.submitted});
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }

        if (nextProps.hotel.data !== this.props.hotel.data) {
            this.setState({...nextProps.hotel.data, showForm: true} );
        }
    }

    componentDidMount() {
        this.props.fetchDetails();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        let hotelData;
        const data = _.pick(this.state, ['name', 'address', 'city', 'state', 'country', 'zip', 'phone', 'email']);

        if (this.state.file) {
            hotelData = new FormData();
            hotelData.append('file', this.state.file);
            Object.keys(data).forEach(key => hotelData.append(key, data[key]));
        } else {
            hotelData = data;
        }

        this.props.saveDetails(this.state.id, hotelData);
    };

    getUploadedFile = (file) => {
        this.setState({file});
    };

    render() {
        const {
            name, address, city, state, country, zip, phone, email,
            image, errors, loading, showForm, submitted
        } = this.state;

        return (
            <Container>
                <CssBaseline />
                <Paper>
                    <Box marginTop={1} p={1.5} className="dashboard-title">
                        <Typography variant="h5" component="h5" align={"left"}>
                            <Edit />
                            <span>Hotel Details</span>
                        </Typography>
                    </Box>
                    {loading && <CircularProgress />}
                    {showForm &&
                        <form encType="multipart/form-data">
                            <Box p={1.5} display="flex" flexDirection="row" justifyContent="space-between">
                                <Paper square={true}>
                                    <div id="hotel-form" style={{paddingLeft: "10px"}}>
                                        <Box>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                type="text"
                                                name="name"
                                                className="text-fields"
                                                value={name || ""}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="address"
                                                label="Address"
                                                type="text"
                                                name="address"
                                                className="text-fields"
                                                value={address || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="city"
                                                label="City"
                                                type="text"
                                                name="city"
                                                className="text-fields"
                                                value={city || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="state"
                                                label="State"
                                                type="text"
                                                name="state"
                                                className="text-fields"
                                                value={state || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                id="country"
                                                label="Country"
                                                type="text"
                                                name="country"
                                                className="text-fields"
                                                value={country || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="zip"
                                                label="Zip"
                                                type="text"
                                                name="zip"
                                                className="text-fields"
                                                value={zip || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="phone"
                                                label="Phone"
                                                type="text"
                                                name="phone"
                                                className="text-fields"
                                                value={phone || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                            <TextField
                                                id="email"
                                                label="Email"
                                                type="email"
                                                name="email"
                                                className="text-fields"
                                                value={email || ""}
                                                onChange={this.handleChange}
                                                margin="normal"
                                            />
                                        </Box>
                                        <SubmitButton
                                            icon={<Save />}
                                            text={"Save Details"}
                                            size="medium"
                                            loader={submitted}
                                            submit={this.handleSubmit}
                                        />
                                    </div>
                                </Paper>
                                <Paper square={true}>
                                    <ImageUpload image={Api.image(image)} handleUpload={this.getUploadedFile} />
                                </Paper>
                            </Box>
                        </form>
                    }
                </Paper>
            </Container>
        );
    }
}

export default HotelDetails;