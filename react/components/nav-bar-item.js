import React, { Component, PropTypes } from 'react'
import NavBar from './nav-bar'


class NavBarItem extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        let content = [(<a href={this.props.url}>{this.props.text}</a>)]
        if(this.props.submenu){
            content.push(<NavBar items={this.props.submenu} subnav={true} />);
        }
        return (
            <li>
                {content}
            </li>
        )
    }    
}

NavBarItem.propTypes = {
    text: PropTypes.string,
    url: PropTypes.string,
    submenu: PropTypes.array
}

export default NavBarItem
