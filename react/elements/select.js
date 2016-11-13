import React from 'react'
import Immutable from 'immutable'

import COUNTRY_CALLING_CODES from '../../data/country-calling-codes'


/**
 * default select
 */
export const Select = (props) => {
    return <div className="select_wrap">
                <select className={props.className} onChange={props.onChange} name={props.name} id={props.id} autoFocus={props.autoFocus} required={props.required}>
                    {
                        props.options.map(
                            (ele, index) => {
                                return <option key={index} value={ele.value}>{ele.label}</option>
                            }
                        )
                    }
               </select>
           </div>
}

Select.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string,
    required: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    options: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.string
       }).isRequired
    )
}

Select.defaultProps = {
    id: '',
    className: '',
    required: '',
    autoFocus: false
}

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
     let options = COUNTRY_CALLING_CODES

     let local = Immutable.fromJS(props).set('options', options).toJSON()

     return <Select {...local} />
 }
