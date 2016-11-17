import React, { Component, PropTypes } from 'react'


/**
 * toggle component
 * also allow control by props
 */
class Toggle extends Component {   
    constructor(props) {   
        super(props) 
        this.state = { isActive: false }
    }   

    onToggle = () => this.setState({isActive: !this.state.isActive})   

    render = () => this.props.children(this.state.isActive, this.onToggle)   
}


export default Toggle
