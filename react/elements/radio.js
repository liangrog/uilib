import React from 'react'

import { Label } from './label'


/**
 * default radio
 */
export const Radio = (props) =>
    (<input type="radio" className={props.className} name={props.name} id={props.id} value={props.value} checked={props.checked} onChange={props.onChange} defaultChecked={props.defaultChecked} autoFocus={props.autoFocus} />)

Radio.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    style: React.PropTypes.string,
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    autoFocus: React.PropTypes.bool
}

Radio.defaultProps = {
    id: '',
    className: '',
    autoFocus: false,
    defaultCheck: false
}

/**
 * default radio group
 */
export const RadioGroup = (props) => (
    <ul className={props.className} name={props.name} id={props.id}>
        {
            props.li.map((ele, index) => {
                return <li key={index}>
                           <Radio {...ele.userInput} />
                           <Label {...ele.label} />
                       </li>
            })
        }
    </ul>
)   

RadioGroup.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    li: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            label: React.PropTypes.object.isRequired,
            userInput: React.PropTypes.object.isRequired
        }).isRequired
    ).isRequired
}

RadioGroup.defaultProps = {
    id: '',
    className: '',
    name: ''
}

/**
 * Gender radio group
 */
export const GenderRadioGroup = props => {
    let index = props.index ? '_' + props.index : ''
    let data = [
        {
            label: {children: 'Female', htmlFor: 'gender_female' + index},
            userInput: {name: 'gender' + index, id: 'gender_female' + index, value: 'female', ...props.female}
        },        
        {
            label: {children: 'Male', htmlFor: 'gender_male' + index},
            userInput: {name: 'gender' + index, id: 'gender_male' + index, value: 'male', ...props.male}
        }
    ]

    return <RadioGroup className={props.className} name={props.name} id={props.id} li={data} />
}

GenderRadioGroup.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    male: React.PropTypes.ObjectOf(
        React.PropTypes.shape({
            checked: React.PropTypes.bool,
            onChange: React.PropTypes.func,
            className: React.PropTypes.string
        })
    ),
    female: React.PropTypes.ObjectOf(
        React.PropTypes.shape({
            checked: React.PropTypes.bool,
            onChange: React.PropTypes.func,
            className: React.PropTypes.string
        })
    ),
    index: React.PropTypes.number
}

GenderRadioGroup.defaultProps = {
    id: '',
    className: '',
    name: ''
}

/**
 * yesno radio group
 */
export const YesnoRadioGroup = props => {
    let index = props.index ? '_' + props.index : ''
    let data = [
        {
            label: {children: 'Yes', htmlFor: 'yesno_yes' + index},
            userInput: {name: 'yesno' + index, id: 'yesno_yes' + index, value: 'yes', ...props.yes}
        },        
        {
            label: {children: 'No', htmlFor: 'yesno_no' + index},
            userInput: {name: 'yesno' + index, id: 'yesno_no' + index, value: 'no', ...props.no}
        }
    ]

    return <RadioGroup className={props.className} name={props.name} id={props.id} li={data} />
}

YesnoRadioGroup.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    male: React.PropTypes.ObjectOf(
        React.PropTypes.shape({
            checked: React.PropTypes.bool,
            onChange: React.PropTypes.func,
            className: React.PropTypes.string
        })
    ),
    female: React.PropTypes.ObjectOf(
        React.PropTypes.shape({
            checked: React.PropTypes.bool,
            onChange: React.PropTypes.func,
            className: React.PropTypes.string
        })
    ),
    index: React.PropTypes.number
}

YesnoRadioGroup.defaultProps = {
    id: '',
    className: '',
    name: '',
    index: ''
}
