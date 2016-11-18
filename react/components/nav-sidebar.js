import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class NavSidebar extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        let items = this.props.items.map(function(item, i) {
            return (
                <li key={i}>
                    <Link to={item.href} activeClassName="active" onlyActiveOnIndex={true}>
                        {item.title}
                    </Link>
                </li>
            )
        })

        return (
            <div className="left-col l_span_3">
                <ul className="left-sub-nav">
                    { items }
                </ul>
            </div>
        )
    }
}


NavSidebar.propTypes = {
    items: PropTypes.array
}


export default NavSidebar
