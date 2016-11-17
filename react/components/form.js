import React, { Component, PropTypes } from 'react'

class Form extends Component {
    constructor(props) {
        super(props)
    }

    setStateVal = (e) => this.setState({[e.target.name]: e.target.value})

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
