import React, { PropTypes } from 'react'

import Form from './form'
import userpool from '../../aws/user-pool'


//FaCC
class CognitoRegisterForm extends Form {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            family_name: '',
            given_name: '',
            gender: 'male',
            phone_number: '',
            password: '',
            enable_mfa: false
        };
    }

    /**
     * register user using AWS
     * Cognito user pool
     */
    register = (e) => {
        e.preventDefault()
        let onFailure = (err) => {
            this.setState({message: ''})
            if (err.message) {
                this.setState({message: err.message})
            }
        }

        let success_path = this.props.success_path ? this.props.success_path : '/'
        let onSuccess = () => this.context.router.push(success_path)
        userpool.register(this.state, onFailure, onSuccess)
    }

    render() {
        return (
            this.props.children(this)
        )
    }
}

CognitoRegisterForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoRegisterForm
