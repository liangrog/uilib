import React from 'react'

import Form from './form'
import { Input } from '../elements/input'
import { DataSelect } from '../elements/select'


class Telephone extends Form {

    constructor(props) {
        super(props)
        //cater for multi items
        let index = props.index != undefined ?  props.index : ''
        this.countryCodeName = `c_code_${index}`
        this.phoneNumberName = `p_number_${index}`
    }

    updatePhoneNumber = (e) => {
        // Update local tel params
        this.state[e.target.name] = e.target.value

        // Fire onChange
        this.props.onChange(
            {
                target: {
                    name: this.props.name,
                    value: this.state[this.countryCodeName] + this.state[this.phoneNumberName]
                }
            }
        )
    }

    render = () => {
        let dialCodeEle = {
            name: this.countryCodeName,
            required: this.props.required,
            autoFocus: this.props.autoFocus,
            whiteList: ['+61', '+86'],
            onChange: this.updatePhoneNumber
        }

        return (
            <div id={this.props.id} className={`clearfix ${this.props.className}`}>
                <div className="l_span_4">
                    { DataSelect('countryDialCode')(dialCodeEle)}
                </div>

                <div className="l_span_8 l_last">
                    <Input className=""
                           type="tel"
                           name={this.phoneNumberName}
                           required={this.props.required}
                           onChange={this.updatePhoneNumber}
                    />
                </div>
            </div>
        )
    }
}

Telephone.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    index: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.string,
    required: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
}

Telephone.defaultProps = {
    id: '',
    className: '',
    autoFocus: false,
    defaultValue: '',
    required: ''
}


export default Telephone
