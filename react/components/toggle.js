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

    onToggle = () => props.onToggle != undefined ? props.onToggle() : this.setState({isActive: !this.state.isActive})   

    render = () => this.props.children(props.isActive != undefined ? props.isActive : this.state.isActive, this.onToggle)   
}

//provide toggle control for parent component
Toggle.propTypes = {
    onToggle: PropTypes.func,
    isActive: PropTypes.bool
}


const toggle = new Toggle()
export toggle
