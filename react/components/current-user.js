import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchAgentProfile } from 'account/redux/actions'

class CurrentUser extends Component {
    constructor(props) {
        super(props)
        props.fetchProfile()
        this.state = {
            profile_photo: 'http://www.asianplasticsurgeryguide.com/images/blog/asianman.jpg',
            menuOpen: false
        }
        document.addEventListener('click', this.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    toggleMenu = e => {
        e.preventDefault()
        let menuOpen = !this.state.menuOpen
        this.setState({menuOpen})
    }

    displayMenu = () => {
        if (this.props.children && this.state.menuOpen) {
            return (
                <div className="user_account_dropdown">
                    <div className="arrow-up"></div>
                    <div className="inner">
                        {this.props.children}
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    handleClick = e => {
        if(!ReactDOM.findDOMNode(this).contains(e.target)) {
            // clicking outside the component
            this.setState({ menuOpen: false })
        }

        if (e.target.tagName === 'A') {
            this.setState({ menuOpen: false })
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

const mapStateToProps = ({ agentProfile }) => {
    return {
        profile: agentProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: () => dispatch(fetchAgentProfile())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser)
