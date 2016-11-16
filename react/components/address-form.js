import React, { Component, PropTypes } from 'react'

import Util from '../utils'
import { Input } from '../elements/input'
import { StateSelect, CountrySelect } from '../elements/select'


class AddressForm extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <ul className="form-list">
                <li className="l_half">
                    <label className="required">Address Line 1</label>
                    <Input className=""
                            type="text"
                            name={Util.makeName(this.props.namePrefix, "address_line_1")}
                            value={Util.valOr(this.props.address.address_line_1)}
                            onChange={this.props.onUserInput}
                            required={true}
                            />
                </li>
                <li className="l_half l_last">
                    <label className="required">Address Line 2</label>
                    <Input className=""
                            type="text"
                            name={Util.makeName(this.props.namePrefix, "address_line_2")}
                            value={Util.valOr(this.props.address.address_line_2)}
                            onChange={this.props.onUserInput}
                            />
                </li>
                <li className="l_half ">
                    <label className="required">Suburb</label>
                    <Input className=""
                            type="text"
                            name={Util.makeName(this.props.namePrefix, "suburb")}
                            value={Util.valOr(this.props.address.suburb)}
                            onChange={this.props.onUserInput}
                            required={true}
                            />
                </li>
                <li className="l_span_3">
                    <label className="required">State</label>
                    <StateSelect
                            name={Util.makeName(this.props.namePrefix, "state")}
                            value={Util.valOr(this.props.address.state)}
                            onChange={this.props.onUserInput}
                            required={true}
                            />
                </li>
                <li className="l_span_3 l_last">
                    <label className="required">Post Code</label>
                    <Input className=""
                            type="number"
                            name={Util.makeName(this.props.namePrefix, "postcode")}
                            value={Util.valOr(this.props.address.postcode)}
                            onChange={this.props.onUserInput}
                            required={true}
                            maxLength={5}
                            />
                </li>
                <li className="l_half">
                    <label className="required">Country</label>
                    <CountrySelect
                            name={Util.makeName(this.props.namePrefix, "country")}
                            value={Util.valOr(this.props.address.country)}
                            onChange={this.props.onUserInput}
                            required={true}
                            />
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