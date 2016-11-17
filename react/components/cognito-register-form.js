import React, { PropTypes } from 'react'

import Form from './form'
import userpool from '../../aws/user-pool'


//FaCC
class CognitoRegisterForm extends Form {

    constructor(props) {
        super(props)
        //mandatory state => element
        this.state = {
            message: '',
            family_name: '',
            given_name: '',
            email: '',
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

        let onSuccess = () => this.context.router.push(this.props.successPath != undefined ? this.props.successPath : '/')
        
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
    successPath: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoRegisterForm
