import React from 'react'

/**
 * default Checkbox
 */
export const Checkbox = (props) =>
    <input type="checkbox"
            id={props.id}
            className={props.className}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
            checked={props.checked}
            autoFocus={props.autoFocus}
            required={props.required}
            />

Checkbox.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool,
    required: React.PropTypes.string
}

Checkbox.defaultProps = {
    id: '',
    className: '',
    autoFocus: false,
    required: ''
}
