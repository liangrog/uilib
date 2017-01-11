import React, { Component, PropTypes } from 'react'
import NavBar from './nav-bar'
import { Link } from 'react-router'


class NavBarItem extends Component {

    render = () => {
        let content = [(
            <Link key='0' to={this.props.url} activeClassName="active" onlyActiveOnIndex={true}>
                {this.props.text}
            </Link>
        )]
        if(this.props.submenu){
            content.push(<NavBar key={`${content.length}`} items={this.props.submenu} subnav={true} />);
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
