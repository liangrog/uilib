import React from 'react'

import { Input } from '../elements/input'
import { DataSelect } from '../elements/select'
import uiHelper from '../../utils/ui-helper'


class Telephone extends React.Component {

    constructor(props) {
        super(props)
        //cater for multi items
        let index = props.index != undefined ?  props.index : ''
        this.countryCodeName = `c_code_${index}`
        this.phoneNumberName = `p_number_${index}`
        this.state = {}
    }

    updatePhoneNumber = (e) => {
        // Update local tel params
        this.state[e.target.name]= e.target.value
        this.setState({})

        // Fire onChange
        this.props.onChange(
            {
                target: {
                    name: this.props.name,
                    value: uiHelper.valOr(this.state[this.countryCodeName]) + uiHelper.valOr(this.state[this.phoneNumberName])
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
            onChange: this.updatePhoneNumber,
            value: this.props.phone_number ? this.props.phone_number.substring(0, 3) : ''
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
                           value={this.props.phone_number ? this.props.phone_number.substring(3) : ''}
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
