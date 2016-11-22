import React from 'react'


const formSectionCollapsableDecor = (Component) => {

    return (props) => {

        if (props.collapsed) {
            // Display collapsed view
            return (
                <div className="l_full collapsed-form-element">
                    <div className="clearfix">
                        <div className="l_span_9" onClick={props.onExpand}>
                            {
                                props.collapsedDisplayAttrs.map(
                                    (attr, i) => (
                                        <span key={i}>
                                            {props.formData[attr]} &nbsp;
                                        </span>
                                    )
                                )
                            }
                        </div>
                        <div className="l_span_3 l_last text-right">
                            <a href="#" className="delete" onClick={props.onDelete}>
                                Delete
                            </a>
                        </div>
                    </div>
                </div>
            )
        } else {
            // Display origin form view
            return (
                <div className="clearfix">
                    <Component
                            namePrefix={props.namePrefix}
                            {...{[props.objName]: props.formData}}
                            onChange={props.onChange}
                            />
                </div>
            )
        }
    }
}

export default formSectionCollapsableDecor
