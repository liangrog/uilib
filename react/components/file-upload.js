import { Component, PropTypes } from 'react'

import logger from '../../logger'

const propTypes = {
    acceptedTypes: PropTypes.object,
    children: PropTypes.any,
    dirName: PropTypes.string,
    imgPreview: PropTypes.bool,
    onFailure: PropTypes.func,
    onSuccess: PropTypes.func,
    uploadFile: PropTypes.func.isRequired
}

class FileUpload extends Component {
    constructor (props) {
        super(props)
        this.acceptedTypes = props.acceptedTypes || {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true,
            'application/pdf': true
        }

        this.state = {
            imageUrl: ''
        }
    }

    upload = e => {
        e.preventDefault()

        const file = e.target.files[0]
        const onFailure = this.props.onFailure || ((err) => { logger.log(err) })
        const onSuccess = this.props.onSuccess || ((data) => { logger.log(data) })

        if (this.props.imgPreview) {
            this.preview(file)
        }

        if (this.acceptedTypes[file.type]) {
            this.props.uploadFile(file, this.props.dirName, onFailure, onSuccess)
        }
    }

    preview = (file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({
                imageUrl: reader.result
            })
        }

        reader.readAsDataURL(file)
    }

    render = () => this.props.children(this)
}

FileUpload.propTypes = propTypes

FileUpload.defaultProps = {
    dirName: '',
    imgPreview: false
}

export default FileUpload
