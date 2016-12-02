import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAgentProfile } from '../../../account/redux/actions'

class CurrentUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile_photo: 'http://www.asianplasticsurgeryguide.com/images/blog/asianman.jpg',
            menuOpen: false
        }
    }

    componentWillMount() {
        this.props.fetchProfile()
    }

    toggleMenu = (e) => {
        e.preventDefault()
        let menuOpen = !this.state.menuOpen
        this.setState({menuOpen})
    }

    displayMenu = () => {
        if (this.props.children && this.state.menuOpen) {
            return (
                <div style={{position: 'relative', overflow: 'visible'}}>
                    <div style={{position: 'absolute', right: 0, background: 'white', padding: '10px 15px', width: '350px', zIndex: 9999}}>
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    render = () => {
        return (
            <div className="user_account l_span_2 l_last">
                <a className="user_account_name" href="#" onClick={this.toggleMenu}>
                    <img className="user-photo" alt="" src={this.state.profile_photo} />
                    <span className="user-name">{this.props.profile.given_name}</span>
                    <span className="i_arrow"></span>
                </a>

                {this.displayMenu()}
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
