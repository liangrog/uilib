import React from 'react'
import Immutable from 'immutable'

import fieldValidationDecor from '../components/field-validation-decor'
import AUSTRALIA_STATES from '../../data/australia-states'
import { COUNTRY_AUSTRALIA_ONLY, COUNTRY_DIAL_CODES } from '../../data/countries'
import { VISA_TYPES, SPONSOR_PERIODS } from '../../data/visas'


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
            <div className={"select_wrap " + props.wrapperClassName}>
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
            <div className={"select_wrap " + props.wrapperClassName}>
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
    ),
    wrapperClassName: React.PropTypes.string
}

SelectBase.defaultProps = {
    id: '',
    className: '',
    required: false,
    autoFocus: false,
    wrapperClassName: ''
}

export const Select = fieldValidationDecor(SelectBase)

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
export const CountryDialCodeSelect = (props) => {
    let options = COUNTRY_DIAL_CODES.map(code => ({label:code, value:code}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

 /**
  * select list for state
  */
export const StateSelect = (props) => {
    let options = AUSTRALIA_STATES.map(code => ({label:code, value:code}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

/**
 * select list for state
 */
export const CountrySelect = (props) => {
    let options = COUNTRY_AUSTRALIA_ONLY.map(c => ({label:c, value:c}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

/**
 * select list for state
 */
export const VisaSelect = (props) => {
    let options = VISA_TYPES.map(c => ({label:c, value:c}))

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}

/**
 * select list for state
 */
export const SponsorPeriodSelect = (props) => {
    let options = SPONSOR_PERIODS

    let local = Immutable.fromJS(props).set('options', options).toJSON()

    return <Select {...local} />
}
