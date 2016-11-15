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
        var onSuccess = () => this.context.router.push('/account/login')
        console.log(this.state);
        userpool.registerConfirmByCode(null, this.state.code, onFailure, onSuccess)
    }

    cancelVerify = () => this.context.router.push('/account/login')

    render() {
        return (
            this.props.children(this)
        )
    }
}

CognitoVerifyForm.propTypes = {
    success_path: PropTypes.string,
    children: PropTypes.func.isRequired
}

export default CognitoVerifyForm
