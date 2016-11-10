import React from 'react'

import { Label } from './label'


/**
 * default radio
 */
export const Radio = (props) =>
    <input type="radio" className={props.className} name={props.name} id={props.id} value={props.value} checked={props.checked} onChange={props.onChange} defaultChecked={props.defaultChecked} autoFocus={props.autoFocus} />

Radio.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    style: React.PropTypes.string,
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
export const RadioGroup = (props) => {
    return <ul className={props.className} name={props.name} id={props.id}>
                {
                    props.li.map((ele, index) => {
                        return <li key={index}>
                                   <Radio {...ele.userInput} />
                                   <Label {...ele.label} />
                               </li>
                    })
                }
           </ul>
}

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
