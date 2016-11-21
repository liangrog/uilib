import React, { Component, PropTypes } from 'react'
import NavBar from './nav-bar'

class NavMenu extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <nav className="nav-tab">
                <NavBar items={this.props.items} subnav={false} />
            </nav>
        )
    }    
}

NavMenu.propTypes = {
    items: PropTypes.array
}

export default NavMenu
