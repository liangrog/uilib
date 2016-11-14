import React from 'react'
import Immutable from 'immutable'

import COUNTRY_CALLING_CODES from '../../data/country-calling-codes'
import wrapWithValidation from '../hoc/wrap-with-validation'


/**
 * default select
 */
export const SelectBase = (props) => {
    let selectOptions = props.options.map(
        (ele, index) => {
            return <option key={index} value={ele.value}>{ele.label}</option>
        }
    )

    if (props.value !== undefined) {
        return (
            <div className="select_wrap">
                <select id={props.id}
                        className={props.className}
                        name={props.name}
                        value={props.value}
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        >
                    {selectOptions}
                </select>
            </div>
        )
    } else {
        return (
            <div className="select_wrap">
                <select id={props.id}
                        className={props.className}
                        name={props.name}
                        onChange={props.onChange}
                        autoFocus={props.autoFocus}
                        required={props.required}
                        >
                    {selectOptions}
                </select>
            </div>
        )
    }

}

SelectBase.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    required: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.bool
    ]),
    autoFocus: React.PropTypes.bool,
    options: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.string
       }).isRequired
    )
}

SelectBase.defaultProps = {
    id: '',
    className: '',
    required: false,
    autoFocus: false
}

export const Select = wrapWithValidation(SelectBase)

/**
 * select list for gender
 */
export const GenderSelect = (props) => {
    let options = [
        {
            label: '',
            value: ''
        },
        {
            label: 'Female',
            value: 'female'
        },
        {
            label: 'Male',
            value: 'male'
        }
    ]

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

GenderSelect.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    required: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
}

GenderSelect.defaultProps = {
    id: '',
    className: '',
    required: '',
    autoFocus: false
}

/**
 * select list for country calling codes
 */
export const CountryCallingCodeSelect = (props) => {
    let options = COUNTRY_CALLING_CODES.map(code => ({label:code, value:code}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

 /**
  * select list for state
  */
export const StateSelect = (props) => {
    let options = ["", "ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map(code => ({label:code, value:code}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

/**
 * select list for state
 */
export const CountrySelect = (props) => {
   let options = ["", "Australia"].map(code => ({label:code, value:code}))

   let local = Immutable.fromJS(props).set('options', options).toJSON()

   return <Select {...local} />
}
