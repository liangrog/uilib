import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import uiHelper from '../../utils/ui-helper'


class Form extends Component {
    constructor(props) {
        super(props)
        this.formKeys = []
    }

    updateFormData = (formKeys, props) => {
        this.formKeys.forEach((key) => {
            this.setState({[key]: uiHelper.valOr(props[key])})
        })
    }

    componentWillMount() {
        this.updateFormData(this.formKeys, this.props.formData)
    }

    componentWillReceiveProps(nextProps) {
        if (this.formKeys.length) {
            this.updateFormData(this.formKeys, nextProps.formData)
        }
    }

    setStateVal = (e) => this.setState({[e.target.name]: e.target.value})

    setStateValDeep = (e) => {
        let newState = Immutable.fromJS(this.state).toJSON()
        newState = uiHelper.deepAssign(newState, e.target.name, e.target.value)
        this.setState(newState)
        console.log(newState)
    }

    getStateVal = (name) => this.state[name]
}

Form.contextTypes= {
    router: PropTypes.object
}

/**
 * three ways to redirect:
 * 1. import browserHistory then browserHistory.push but if using different history will require code change
 * 2. use withRouter then access via this.props.router
 * 3. use context as above
 */
export default Form;
