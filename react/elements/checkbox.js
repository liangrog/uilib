import React from 'react'

/**
 * default Checkbox
 */
export const Checkbox = (props) =>
    <input className={props.className} onChange={props.onChange} type="checkbox" name={props.name} id={props.id} value={props.value} autoFocus={props.autoFocus} required={props.required} />

Checkbox.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    autoFocus: React.PropTypes.bool,
    required: React.PropTypes.string
}

Checkbox.defaultProps = {
    id: '',
    className: '',
    autoFocus: false,
    required: ''
}
