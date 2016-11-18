import React, { Component } from 'react'


class DefaultImgUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            imageUrl: ''
        }
    }

    upload = e => {
        e.preventDefault()

        let reader = new FileReader()
        let file = e.target.files[0]

        reader.onloadend = () => {
            this.setState({
                file: file,
                imageUrl: reader.result
            });
        }

        reader.readAsDataURL(file)

        //todo handle upload to s3
    }

    render = () => {
        let image = null
        if (this.state.imageUrl) {
            image = (<img src={imagePreviewUrl} />)
        } else {
            image = (<div className="img-caption"></div>)
        }

        return (
            <div>
                <div className="img-container l_span_2">
                     { image }
                     <img src="{imagePreviewUrl}" alt />
                </div>
                <div className="l_span_10 l_last">
                    <a className="" id="upload" onClick={() => this.refs.fileInput.click()}></a>
                    <input className="btn" type="file" ref="fileInput" onChange={this.upload}/>
                    <p>You can also drag and drop a picture from your computer.</p>
                    <div className="">
                        <p><strong>Upload requirements</strong><br/>
                        Photo dimensions 600 x 600 pixels.<br/>
                        Maximum file size is 5MB and accepted file types are JPG, GIF and PNG.</p>
                    </div>
                </div>
            </div>
        )
    }
}

DefaultImgUpload.defaultProps = {
    imgCaption: '',
    buttonLabel: 'Upload'
}

export default DefaultImgUpload
