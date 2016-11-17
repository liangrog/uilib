import React, { Component } from 'react'


/**
 * wrapper component for control logic
 */
class Password extends Component {   
    constructor(props) {   
        super(props) 
        this.state = {
            inputType: 'password'
        }
    }   

    //change input type attribute
    onToggle = (e) => this.setState({inputType: this.state['inputType'] == 'password' ? 'text' : 'password'})

    render = () => <PasswordInput onToggle={this.onToggle} inputType={this.state['inputType']} {...this.props} />
}

Password.propTypes = {
    onChange: React.PropTypes.func,
    password: React.PropTypes.string
}

Password.defaultProps = {
    password: ''
}


/**
 * prsentation component
 * gets re-rendered by input type prop change
 *
 */
class PasswordInput extends Component {   
    constructor(props) {   
        super(props) 
    }   

    render = () => (
        <div>
            <input type={this.props.inputType} className="input-text" onChange={this.props.onChange} name="password" id="password" required="" defaultValue={this.props.password} />
            <div className="password-show">
                <input type="checkbox" id="show_pass" className="checkbox visuallyhidden" name="show_pass" onClick={this.props.onToggle}/>
                <label htmlFor="show_pass" className="checkbox_text" title="">Show</label>
            </div>
        </div>
    )
}

export default Password
