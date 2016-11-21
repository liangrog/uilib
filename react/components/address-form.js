import React, { Component, PropTypes } from 'react'

import uiHelper from '../../utils/ui-helper'
import { Input } from '../elements/input'
import { DataSelect } from '../elements/select'


class AddressForm extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        let stateEle = {
            name: uiHelper.makeName(this.props.namePrefix, "state"),
            defaultValue: uiHelper.valOr(this.props.address.state),
            required: this.props.address.required,
            whiteList: ['+61', '+86'],
            onChange: this.props.onUserInput
        }

        let countryEle = {
            name: uiHelper.makeName(this.props.namePrefix, "country"),
            defaultValue: uiHelper.valOr(this.props.address.state),
            required: this.props.address.required,
            onChange: this.props.onUserInput
        }



        return (
            <ul className="form-list">
                <li className="l_half">
                    <label className="required">Address line 1</label>
                    <Input className="input-text"
                            type="text"
                            name={uiHelper.makeName(this.props.namePrefix, "address_line_1")}
                            defaultValue={uiHelper.valOr(this.props.address.address_line_1)}
                            onChange={this.props.onUserInput}
                            required={this.props.address.required}
                            />
                </li>
                <li className="l_half l_last">
                    <label className="required">Address line 2</label>
                    <Input className="input-text"
                            type="text"
                            name={uiHelper.makeName(this.props.namePrefix, "address_line_2")}
                            defaultValue={uiHelper.valOr(this.props.address.address_line_2)}
                            onChange={this.props.onUserInput}
                            />
                </li>
                <li className="l_half ">
                    <label className="required">Suburb</label>
                    <Input className="input-text"
                            type="text"
                            name={uiHelper.makeName(this.props.namePrefix, "suburb")}
                            defaultValue={uiHelper.valOr(this.props.address.suburb)}
                            onChange={this.props.onUserInput}
                            required={this.props.address.required}
                            />
                </li>
                <li className="l_span_3">
                    <label className="required">State</label>
                    { DataSelect('ausState')(stateEle) }
                </li>
                <li className="l_span_3 l_last">
                    <label className="required">Post code</label>
                    <Input className="input-text"
                            type="number"
                            name={uiHelper.makeName(this.props.namePrefix, "postcode")}
                            defaultValue={uiHelper.valOr(this.props.address.postcode)}
                            onChange={this.props.onUserInput}
                            required={this.props.address.required}
                            maxLength={10}
                            />
                </li>
                <li className="l_full">
                    <label className="required">Country</label>
                    { DataSelect('country')(countryEle) }
                </li>
            </ul>
        )
    }
}

AddressForm.PropTypes = {
    namePrefix: PropTypes.string,
    address: PropTypes.object
}

AddressForm.defaultProps = {
      address: {}
}

export default AddressForm
