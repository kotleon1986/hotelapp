import React, {Component} from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Paper} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {PermIdentity} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import SubmitButton from "../common/elements/SubmitButton";
import Countries from "../../constants/countries";
import MenuItem from "@material-ui/core/MenuItem";

class Profile extends Component {
    constructor(props) {
        super(props);

        const user = props.auth.user;

        this.state = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            city: user.city,
            country: user.country,
            phone: user.phone,
            fax: user.fax,
            errors: {},
            loader: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        this.setLoader(nextProps.auth.submitted);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            country: this.state.country,
            phone: this.state.phone,
            fax: this.state.fax,
        };

        this.props.saveProfile(userData);
    };

    setLoader(submitted) {
        return this.setState({loader: submitted});
    }

    render() {
        const {
            first_name, last_name, email, address, city, country, phone, fax, errors, loader
        } = this.state;

        return (
            <Container maxWidth="sm">
                <CssBaseline />
                <Paper>
                    <Box marginTop={1} p={1.5}>
                        <Avatar style={{margin: "0 auto"}}>
                            <PermIdentity />
                        </Avatar>
                        <Typography variant="h4" component="h4" align={"center"}>
                            Edit Profile
                        </Typography>
                    </Box>
                    <Box p={1.5}>
                        <form action="">
                            <TextField
                                id="standard-full-width"
                                label="First Name"
                                name="first_name"
                                value={first_name || ''}
                                fullWidth
                                onChange={this.onChange}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="Last Name"
                                name="last_name"
                                value={last_name || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                error={!!errors.email}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="Address"
                                name="address"
                                value={address || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="City"
                                name="city"
                                value={city || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="Country"
                                name="country"
                                select
                                value={country || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            >
                                {Countries.map(country => (
                                    <MenuItem key={country} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="standard-full-width"
                                label="Phone"
                                name="phone"
                                value={phone || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="standard-full-width"
                                label="Fax"
                                name="fax"
                                value={fax || ''}
                                onChange={this.onChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                            <SubmitButton
                                text={"Save Profile"}
                                loader={loader}
                                submit={this.onSubmit}
                            />
                        </form>
                    </Box>
                </Paper>

            </Container>
        );
    }
}

export default Profile;