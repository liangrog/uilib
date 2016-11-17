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
            password: ''
        }
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

        let success_path = this.props.success_path ? this.props.success_path : '/account/verification'
        let onSuccess = () => this.context.router.push(success_path)
        userpool.register(this.state, onFailure, onSuccess)
    }

    render() {
        return (
            <div>
                { this.state.message ? <div className='alert alert-info'>{this.state.message}</div> : '' }
                { this.props.children(this) }
            </div>
        )
    }
}

CognitoRegisterForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoRegisterForm
