import React, { PropTypes } from 'react'

import Form from './form'
import userpool from '../../aws/user-pool'


//FaCC
class CognitoVerifyForm extends Form {

    constructor(props) {
        super(props)
        this.state = {
            code: '',
            message:''
        }
    }

    /**
     * verify user using AWS
     * Cognito user pool
     */
    verify = (e) => {
        e.preventDefault()

        let onFailure = (err) => {
            this.setState({message: err.message})
        }
        var onSuccess = () => this.context.router.push(this.props.successPath != undefined ? this.props.successPath : '/account/login')
        console.log(this.state);
        userpool.registerConfirmByCode(null, this.state.code, onFailure, onSuccess)
    }

    cancelVerify = (e) => this.context.router.push(this.props.cancelPath != undefined ? this.props.cancelPath : '/account/login')

    resend = (e) => {
        let onFailure = (err) => {
            this.setState({message: err.message})
        }
        userpool.resendConfirmCode(null, onFailure)
    }

    render() {
        return (
            this.props.children(this)
        )
    }
}

CognitoVerifyForm.propTypes = {
    successPath: PropTypes.string,
    cancelPath: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoVerifyForm
