/* eslint-disable camelcase */
import React, { PropTypes } from 'react'

import Form from './form'
import userpool from '../../aws/user-pool'


// FaCC
class CognitoAuthForm extends Form {

    constructor (props) {
        super(props)
        this.state = {
            userId: '',
            password: '',
            message: ''
        }
    }

    /**
     * authenticate user using AWS
     * Cognito user pool
     */
    authenticate = (e) => {
        e.preventDefault()

        let onFailure = (err) => {
            // reset password
            this.setState({password: ''})

            return this.setState({message: err.message})
        }

        let success_path = this.props.success_path ? this.props.success_path : '/'
        let onSuccess = () => this.context.router.push(success_path)

        userpool.authenticate(this.state.userId, this.state.password, onFailure, onSuccess)
    }

    render () {
        return (
            <div>
                { this.state.message ? <div className='alert alert-info'>{this.state.message}</div> : '' }
                { this.props.children(this) }
            </div>
        )
    }
}

CognitoAuthForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.any.isRequired
}

CognitoAuthForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CognitoAuthForm
