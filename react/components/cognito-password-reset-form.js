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
            code: '',
            password: '',
            isActive: false
        }
    }

    /**
     * authenticate user using AWS
     * Cognito user pool
     */
    sendCode = (e) => {
        e.preventDefault()
        //close code input
        this.onToggle

        let onFailure = (err) => {
            this.setState({message: err.message})
        }

        let onSuccess = () => this.onToggle()
        
        userpool.forgotPassword(this.state.id, onFailure, onSuccess)
    }

    onToggle = () => this.setState({isActive: !this.state.isActive})

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
            <div>
                { this.state.message ? <div className='alert alert-info'>{this.state.message}</div> : '' }
                { this.props.children(this) }
            </div>
        )
    }
}

CognitoPasswordResetForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoPasswordResetForm
