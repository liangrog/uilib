import React, { PropTypes } from 'react'

import Form from './form'
import userpool from '../../aws/user-pool'


//FaCC
class CognitoPasswordResetForm extends Form {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            message:'',
            code: ''
        }
    }

    /**
     * authenticate user using AWS
     * Cognito user pool
     */
    sendCode = (e) => {
        e.preventDefault()
        let onFailure = (err) => {
            this.setState({message: err.message})
        }
        let onSuccess = () => this.context.router.push('/account/login')
        userpool.forgotPassword(this.state.id, onFailure, onSuccess)
    }

    changePassword = (e) => {
        e.preventDefault()
        let callback = {
            onFailure: (err) => this.setState({message: err.message}),
            onSuccess: () => this.context.router.push('/account/login')
        }
        userpool.confirmPassword(this.state.code, this.state.password, callback)
    }

    cancelReset = (e) => {
        e.preventDefault()
        this.context.router.push('/account/login')
    }

    render() {
        return (
            this.props.children(this)
        )
    }
}

CognitoPasswordResetForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoPasswordResetForm
