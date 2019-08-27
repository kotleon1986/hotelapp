import React, {Component} from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import {Edit} from "@material-ui/icons";

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageUrl: props.image || `${process.env.REACT_APP_BASE_URL}/images/no-image`,
            imageUrl: props.image || `${process.env.REACT_APP_BASE_URL}/images/no-image`,
            file: null
        };
    };

    openBrowser = () => {
        document.getElementById('upload_file_input').click();
    };

    uploadedImage = (e) => {
        this.setState({
            file: e.target.files[0],
            imageUrl: URL.createObjectURL(e.target.files[0])
        });

        this.props.handleUpload(e.target.files[0])
    };

    render() {
        const {imageUrl} = this.state;

        return (
           <div className="image-upload-container">
               <div className="image-preview">
                   <img src={imageUrl} alt="Preview" />
               </div>
               <div className="image-upload-actions">
                   <TextField type="file" id="upload_file_input" className="hidden" onChange={this.uploadedImage} />
                   <Fab color="primary" aria-label="Upload Image" onClick={this.openBrowser}>
                       <Edit />
                   </Fab>
               </div>
           </div>
        );
    }
}


ImageUpload.propTypes = {
    handleUpload: PropTypes.func.isRequired
};


export default ImageUpload;
