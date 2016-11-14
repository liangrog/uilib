import React, { Component } from 'react'


class FormBottomNav extends Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (
            <div class="button_footer">
                <div class="l_span_6">
                    <a class="btn btn-clear btn-icon btn-icon-back" id="back">Back</a>
                </div>
                <div class="l_span_6 l_last">
                    <button class="btn btn-secondary btn-right" type="submit" id="save">Save</button>
                    <button class="btn btn-primary btn-right btn-icon btn-icon-arrow" type="submit" id="next">Next</button>
                </div>
            </div>
        )
    }    
}


export default FormBottomNav
