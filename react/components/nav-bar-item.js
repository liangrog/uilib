import React, { Component, PropTypes } from 'react'
import NavBar from './nav-bar'
import { Link } from 'react-router'


class NavBarItem extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        let content = [(
            <Link to={this.props.url} activeClassName="active" onlyActiveOnIndex={true}>
                {this.props.text}
            </Link>
        )]
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
