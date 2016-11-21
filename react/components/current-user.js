import React, { Component, PropTypes } from 'react'


class CurrentUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_photo: 'http://www.asianplasticsurgeryguide.com/images/blog/asianman.jpg',
            username: 'Anonymous'
        }
    }

    render = () => {
        return (
            <div className="user_account l_span_2 l_last">
                <a href="">
                <img className="user-photo" alt="" src={this.state.profile_photo} />
                    <span className="user-name">{this.state.username}</span>
                    <span className="i_arrow"></span>
                </a>
            </div>
        )
    }    
}

export default CurrentUser