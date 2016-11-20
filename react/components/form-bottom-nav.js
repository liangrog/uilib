import React, { Component } from 'react'


class FormBottomNav extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <div className="button_footer">
                <hr className="hr1" />
                <div className="l_span_6">
                    <a className="btn btn-clear btn_icon btn-icon-back btn_icon_back" id="back">Back</a>
                </div>
                <div className="l_span_6 l_last">
                    <button className="btn btn-primary btn-right btn-icon btn-icon-arrow btn_next btn_right btn_has_arrow" type="submit" id="next">Next</button>
                    <button className="btn btn_secondary btn_right" type="submit" id="save">Save</button>
                </div>
            </div>
        )
    }
}


export default FormBottomNav
