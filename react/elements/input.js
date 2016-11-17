import React from 'react'

import fieldValidationDecor from '../components/field-validation-decor'


/**
 * default Input
 */
export const InputBase = (props) => {
    //controlled
    if (props.value !== undefined) {
        return (
            <input type={props.type}
                    id={props.id}
                    className={'input-text' + ' ' + props.className}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    autoFocus={props.autoFocus}
                    required={props.required}
                    minLength={props.minLength}
                    maxLength={props.maxLength}
                    readOnly={props.readOnly}
                    />
        )

    //uncontrolled
    } else {
        return (
            <input
                    type={props.type}
                    id={props.id}
                    className={'input-text' + ' ' + props.className}
                    name={props.name}
                    onChange={props.onChange}
                    autoFocus={props.autoFocus}
                    defaultValue={props.defaultValue}
                    required={props.required}
                    minLength={props.minLength}
                    maxLength={props.maxLength}
                    readOnly={props.readOnly}
                    />
        )
    }
}

InputBase.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    defaultValue: React.PropTypes.string,
    required: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    autoFocus: React.PropTypes.bool,
    minLength: React.PropTypes.number,
    maxLength: React.PropTypes.number,
    readOnly: React.PropTypes.bool
}

InputBase.defaultProps = {
    id: '',
    className: '',
    type: 'text',
    autoFocus: false,
    defaultValue: '',
    required: false,
    readOnly: false
}

export const Input = fieldValidationDecor(InputBase)
