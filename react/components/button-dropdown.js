import React from 'react'


class ButtonDropdown extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showButtons: false
        }
    }

    toggleButtons = (e) => {
        e.preventDefault()
        this.setState({
            showButtons: !this.state.showButtons
        })
    }

    buttons = () => {
        if (this.state.showButtons) {
            return (
                <div style={{position: 'absolute', right: 0}}>
                    {
                        this.props.buttons.map(
                            (button, i) => (
                                <button key={i} className="btn btn-primary" onClick={button.onClick}>
                                    {button.label}
                                </button>
                            )
                        )
                    }
                </div>
            )
        } else {
            return null
        }
    }

    render = () => {
        if (this.props.buttons.length > 0) {
            return (
                <div style={{position: 'relative'}} className="text-right">
                    <button className="btn btn-primary" onClick={this.toggleButtons}>
                        Actions
                    </button>
                    {this.buttons()}
                </div>
            )
        } else {
            return null
        }
    }
}

ButtonDropdown.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
    })),
}

ButtonDropdown.defaultProps = {
    buttons: []
}

export default ButtonDropdown
