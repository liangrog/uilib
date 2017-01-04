import React from 'react'

import Form from './form'

function findParentForm(element){
    var parent = element.parentNode;
    if (parent && parent.tagName !== 'FORM'){
        parent = findParentForm(parent);
    }
    return parent;
}

class FormBottomNav extends Form {

    back = e => this.context.router.goBack()

    next = e => this.context.router.push(this.props.next)

    validate = e => findParentForm(e.target).checkValidity()

    render = () => {
        return (
            <div className="button_footer">
                <hr className="hr1" />
                <div className="l_span_6">
                    { this.props.backEnabled && <button className="btn btn-clear btn_icon btn-icon-back btn_icon_back" name="back" id="back" onClick={this.back}>Back</button> }
                </div>
                <div className="l_span_6 l_last">
                    { this.props.nextEnabled && <button className="btn btn-primary btn-right btn-icon btn-icon-arrow btn_next btn_right btn_has_arrow" onClick={this.next} type="button" name="next" id="next">Next</button> }
                    { this.props.saveEnabled && <button className="btn btn_secondary btn_right" type="submit" name="save" id="save" onClick={this.validate}>{this.props.submitButtonText}</button> }
                </div>
            </div>
        )
    }
}

FormBottomNav.propTypes = {
    backEnabled: React.PropTypes.bool,
    nextEnabled: React.PropTypes.bool,
    next: React.PropTypes.string,
    saveEnabled: React.PropTypes.bool,
}

FormBottomNav.defaultProps = {
    backEnabled: true,
    nextEnabled: false,
    next: '/',
    saveEnabled: true,
    submitButtonText: 'Save'
}


export default FormBottomNav
