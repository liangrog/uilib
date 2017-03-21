import { Component, PropTypes } from 'react'
import Immutable from 'immutable'

import uiHelper from '../../utils/ui-helper'

const propTypes = {
    formData: PropTypes.object
}

class Form extends Component {
    constructor (props) {
        super(props)
        this.formKeys = []
    }

    updateFormDataPreMount = (formKeys, props) => {
        if (this.formKeys.length && props) {
            this.formKeys.forEach((key) => {
                this.state = {...this.state, [key]: uiHelper.valOr(props[key])}
            })
        }
    }

    updateFormData = (formKeys, props) => {
        if (this.formKeys.length && props) {
            this.formKeys.forEach((key) => {
                this.setState({[key]: uiHelper.valOr(props[key])})
            })
        }
    }

    componentWillMount () {
        this.updateFormData(this.formKeys, this.props.formData)
    }

    componentWillReceiveProps (nextProps) {
        this.updateFormData(this.formKeys, nextProps.formData)
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

Form.propTypes = propTypes

export default Form
