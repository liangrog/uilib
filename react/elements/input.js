import React from 'react'

/**
 * default Input
 */
export const Input = (props) => {
    //controlled
    if (props.value) {
        return <input className={'input-text' + ' ' + props.className} onChange={props.onChange} type={props.type} name={props.name} id={props.id} value={props.value} autoFocus={props.autoFocus} required={props.required}/>
    //uncontrolled
    } else {
        return <input className={'input-text' + ' ' + props.className} onChange={props.onChange} type={props.type} name={props.name} id={props.id} autoFocus={props.autoFocus} defaultValue={props.defaultValue} required={props.required}/>
    }
}

Input.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    required: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
}

Input.defaultProps = {
    id: '',
    className: '',
    type: 'text',
    autoFocus: false,
    defaultValue: '',
    required: ''
}
