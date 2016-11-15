import React from 'react'

import { Input } from './input'
import { CountryDialCodeSelect } from './select'


class Tel extends React.Component {

    constructor(props) {
        super(props)
        this.tel = {
            tel_contry_code: '',
            tel_phone_number: '',
            tel_full: ''
        }
    }

    changeTel = (e) => {
        // Update local tel params
        this.tel[e.target.name] = e.target.value
        this.tel.tel_full = this.tel.tel_contry_code + this.tel.tel_phone_number

        // Fire onChange
        this.props.onChange(
            {
                target: {
                    name: this.props.name,
                    value: this.tel.tel_full
                }
            }
        )
    }

    render = () => {
        return (
            <div id={this.props.id} className={'clearfix ' + this.props.className}>
                <div className="l_span_4">
                    <CountryDialCodeSelect className=""
                            name="tel_contry_code"
                            required={this.props.required}
                            options={[{label:'',value:''},{label:'+61',value:'+61'},{label:'+86',value:'+86'}]}
                            onChange={this.changeTel}
                            />
                </div>

                <div className="l_span_8 l_last">
                    <Input className=""
                            type="tel"
                            name="tel_phone_number"
                            autoFocus={this.props.autoFocus}
                            required={this.props.required}
                            onChange={this.changeTel}
                            />
                </div>
            </div>
        )
    }
}

Tel.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    required: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
}

Tel.defaultProps = {
    id: '',
    className: '',
    type: 'text',
    autoFocus: false,
    defaultValue: '',
    required: ''
}

export { Tel }
