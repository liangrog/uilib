import React, { Component, PropTypes } from 'react'


class NavSidebar extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        let items = this.props.items.map(function(item) {
            return (<li><a href={item.href} title={item.title}>{item.title}</a></li>)
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
