import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class NavSidebar extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        let items = this.props.items.map(function(item) {
            return (
                <li>
                    <Link to={item.href} activeClassName="active" onlyActiveOnIndex={true}>
                        {item.title}
                    </Link>
                </li>
            )
        })
        let progressComponent = this.props.progress || null

        return (
            <div className="left-col">
                { progressComponent }
                <ul className="left-sub-nav">
                    { items }
                </ul>
            </div>
        )
    }
}


NavSidebar.propTypes = {
    items: PropTypes.array,
    progress: PropTypes.element
}


export default NavSidebar
