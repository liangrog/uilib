import React from 'react'

import { Input } from '../elements/input'
import { DataSelect } from '../elements/select'


class Telephone extends React.Component {

    constructor(props) {
        super(props)
        //cater for multi items
        let index = props.index != undefined ?  props.index : ''
        this.countryCodeName = `c_code_${index}`
        this.phoneNumberName = `p_number_${index}`

        this.state = this.splitPhoneNumber(props.phoneNumber)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.phone_number) {
            this.setState(
                this.splitPhoneNumber(nextProps.phone_number)
            )
        }
    }

    splitPhoneNumber = (phoneNumber) => {
        if (phoneNumber) {
            return {
                [this.countryCodeName]: phoneNumber.substring(0, 3),
                [this.phoneNumberName]: phoneNumber.substring(3)
            }
        } else {
            return {
                [this.countryCodeName]: '',
                [this.phoneNumberName]: ''
            }
        }
    }

    updatePhoneNumber = (e) => {
        if (e.target.name === this.countryCodeName && e.target.value === '') {
            // Change country code to empty will clear the whole phone number
            this.state = this.splitPhoneNumber()
        } else {
            // Update local tel params
            this.state[e.target.name] = e.target.value
        }

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

    countryCodeEle = () => {
        let countryCodeEle = {
            name: this.countryCodeName,
            required: this.props.required,
            autoFocus: this.props.autoFocus,
            whiteList: ['+61', '+86'],
            onChange: this.updatePhoneNumber
        }
        // Controlled or not controlled
        if (this.props.phone_number !== undefined) {
            countryCodeEle.value = this.state[this.countryCodeName]
        }
        return countryCodeEle
    }

    phoneNumberEle = () => {
        let phoneNumberEle = {
            className: "",
            type: "tel",
            name: this.phoneNumberName,
            required: this.props.required,
            onChange: this.updatePhoneNumber
        }
        // Controlled or not controlled
        if (this.props.phone_number !== undefined) {
            phoneNumberEle.value = this.state[this.phoneNumberName]
        }
        return phoneNumberEle
    }

    render = () => {
        let countryCodeEle = this.countryCodeEle()
        let phoneNumberEle = this.phoneNumberEle()

        return (
            <div id={this.props.id} className={`clearfix ${this.props.className}`}>
                <div className="l_span_4">
                    { DataSelect('countryDialCode')(countryCodeEle) }
                </div>

                <div className="l_span_8 l_last">
                    <Input {...phoneNumberEle} />
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
