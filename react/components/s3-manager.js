import { Component, PropTypes } from 'react'
import S3 from 'aws-sdk/clients/s3'

import ENV_VARS from '../../env-vars'
import logger from '../../logger'

const propTypes = {
    bucketName: PropTypes.string.isRequired,
    children: PropTypes.any
}

class S3Manager extends Component {
    constructor (props) {
        super(props)
        this.s3 = new S3({
            region: ENV_VARS.S3[props.bucketName].region,
            params: { Bucket: ENV_VARS.S3[props.bucketName].bucket }
        })
    }

    listDir = (dirName = null, onFailure, onSuccess) => {
        let prefix = dirName || ''
        let params = {
            Delimiter: '/',
            Prefix: prefix
        }

        return this.s3.listObjects(params, (err, data) => {
            if (err) {
                logger.log(err)
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            } else {
                if (typeof onSuccess === 'function') {
                    onSuccess(data)
                } else {
                    return data
                }
            }
        })
    }

    createDir = (dirName, onFailure, onSuccess) => {
        dirName = dirName.trim()
        if (!dirName) {
            return logger.log('S3 directory name must contain at least one non-space character.', 'error')
        }

        let dirKey = encodeURIComponent(dirName) + '/'

        this.s3.headObject({Key: dirKey}, (err, data) => {
            if (!err) {
                logger.log(`${dirName} already exists.`)
            }

            if (err.code !== 'NotFound') {
                logger.log(err, 'error')
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            }

            this.s3.putObject({Key: dirKey}, (err, data) => {
                if (err) {
                    logger.log(err, 'error')
                    if (typeof onFailure === 'function') {
                        onFailure(err)
                    }
                }

                if (typeof onSuccess === 'function') {
                    onSuccess(data)
                }
            })
        })
    }

    deleteFile = (fileKey, onFailure, onSuccess) => {
        this.s3.deleteObject({Key: fileKey}, (err, data) => {
            if (err) {
                logger.log(err, 'error')
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            }

            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        })
    }

    deleteDir = (dirName, onFailure, onSuccess) => {
        let dirKey = encodeURIComponent(dirName) + '/'
        let objects

        this.s3.listObjects({Prefix: dirKey}, (err, data) => {
            if (err) {
                logger.log(err, 'error')
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            }

            objects = data.Contents.map((object) => ({Key: object.Key}))
        })

        this.s3.deleteObjects({ Delete: {Objects: objects, Quiet: true} }, (err, data) => {
            if (err) {
                logger.log(err, 'error')
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            }

            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        })
    }

    createFile = (file, dirName, onFailure, onSuccess) => {
        let params = {
            Key: `${encodeURIComponent(dirName)}${Date.now()}___${file.name}`,
            Body: file,
            ACL: ENV_VARS.S3[this.props.bucketName].acl,
            ContentType: file.type
        }

        this.s3.upload(params, (err, data) => {
            if (err) {
                logger.log(err, 'error')
                if (typeof onFailure === 'function') {
                    onFailure(err)
                }
            }

            if (typeof onSuccess === 'function') {
                onSuccess(data)
            }
        })
    }

    render = () => this.props.children(this)
}

S3Manager.propTypes = propTypes

export default S3Manager
