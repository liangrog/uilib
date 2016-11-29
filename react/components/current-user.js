import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAgentProfile } from '../../../account/redux/actions'

class CurrentUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_photo: 'http://www.asianplasticsurgeryguide.com/images/blog/asianman.jpg',
            username: 'Anonymous'
        }
    }

    componentWillMount() {
        this.props.fetchProfile()
    }

    render = () => {
        return (
            <div className="user_account l_span_2 l_last">
                <a href="">
                <img className="user-photo" alt="" src={this.state.profile_photo} />
                    <span className="user-name">{this.props.profile.given_name}</span>
                    <span className="i_arrow"></span>
                </a>
            </div>
        )
    }    
}

const mapStateToProps = (store) => {
    return {
        profile: store.agentProfile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchProfile: () => {
            dispatch(fetchAgentProfile())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)