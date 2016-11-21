import React, { Component, PropTypes } from 'react'
import NavBarItem from './nav-bar-item'

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        let items = this.props.items.map(function(item) {
            return <NavBarItem text={item.title} url={item.href} submenu={item.submenu} key={item.href} />
        })
        let className = this.props.subnav ? 'sub-nav' : 'main-nav'

        return (
            <ul className={className}>
                {items}
            </ul>
        )
    }    
}

NavBar.propTypes = {
    items: PropTypes.array,
    subnav: PropTypes.bool
}

export default NavBar
