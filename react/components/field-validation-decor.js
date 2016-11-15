import React from 'react'


const fieldValidationDecor = (Component) => {

    return (props) => {
        let newClassName = props.className ? props.className : ''

        // Field incomplete if required true but value is empty
        if (props.required) {
            if (props.value === undefined || props.value === '' || props.value === null) {
                newClassName += ' field-incomplete'
            }
        }

        return <Component {...props} className={newClassName} />
    }
}

export default fieldValidationDecor



// Validation display, for future reference:
// <li className="l_half success">
//     <label className="required">Legal Name</label>
//     <InputWithValidation className="input-text required-entry success"
//             type="text"
//             name="legal_name"
//             autoFocus={true}
//             value={Util.valOr(this.props.company.legal_name)}
//             onChange={this.props.companyUpdateFromEvent}
//             maxLength="100"
//             />
//             <span className="i_tick"></span>
// </li>
// <li className="l_half l_last warning">
//     <label className="required">Trading Name</label>
//     <input className="input-text required-entry error"
//             type="text"
//             name="trading_name"
//             value={Util.valOr(this.props.company.trading_name)}
//             onChange={this.props.companyUpdateFromEvent}
//             maxLength="100"
//             />
//             <span className="i_alert"></span>
//             <div className="required_error">Please add a Trading Name</div>
// </li>
// <li className="l_half success">
//     <label className="required">Entity Type</label>
//     <EditEntityType
//             name="entity_type"
//             value={Util.valOr(this.props.company.entity_type)}
//             onChange={this.props.companyUpdateFromEvent}
//             />
//     <span className="i_tick"></span>
// </li>
// <li className="l_span_3 error">
//     <label className="required">Year Founded</label>
//     <input className="input-text required-entry"
//             type="number"
//             name="year_founded"
//             value={Util.valOr(this.props.company.year_founded)}
//             onChange={this.props.companyUpdateFromEvent}
//             maxLength="4"
//             />
//             <span className="i_cross"></span>
//             <div className="required_error">Please add Year Founded</div>
// </li>
