import React, { Component, PropTypes } from 'react'

import logger from '../../logger'


class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.acceptedTypes = {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true
        }

        this.state = {
            imageUrl: ''
        }
    }

    upload = e => {
        e.preventDefault()

        let file = e.target.files[0]
        let onFailure = (err) => { logger.log(err) }
        let onSuccess = (data) => { logger.log(data)}

        if (this.props.imgPreview) {
            this.preview(file)
        }

        if (this.acceptedTypes[file.type]) {
            this.props.uploadFile(file, this.props.dirName, onFailure, onSuccess)
        }

        //todo handle upload to s3
    }

    //preview
    preview = (file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render = () => this.props.children(this)
/*    render = () => {
        return (
            <div>
            <ul className="form-list">
                <li>
                    <label>Profile photo</label>
                </li>
            </ul>
                <div className="img-container l_span_2">
                    <img className="profile-preview" src={this.state.imageUrl} />
                    <img className="profile-preview" src="../../assets/images/profile-preview.png" />
                </div>
                <div className="l_span_10 l_last">
                    {<a className="" id="upload" onClick={() => this.refs.fileInput.click()}>{this.props.buttonLabel}</a>}
                    <input className="btn btn_secondary btn_margin_small" type="file" name="files[]" ref="fileInput" onChange={this.upload}/>
                    <p>You can also drag and drop a picture from your computer.</p>
                    <div className="">
                        <p><strong>Upload requirements</strong><br/>
                        Photo dimensions 600 x 600 pixels.<br/>
                        Maximum file size is 5MB and accepted file types are JPG, GIF and PNG.</p>
                    </div>
                </div>
            </div>
        )
    }*/
}

FileUpload.propTypes = {
    dirName: PropTypes.string,
    imgPreview: PropTypes.bool
}

FileUpload.defaultProps = {
    dirName: '',
    imgPreview: false
}

export default FileUpload
