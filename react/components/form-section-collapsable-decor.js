import React from 'react'


const formSectionCollapsableDecor = (Component) => {

    return (props) => {

        if (props.collapsed) {
            // Display collapsed view
            return (
                <div>
                    <div className="l_span_9">
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
                        <a href="#" className="link" onClick={props.onExpand}>
                            Edit
                        </a>
                        &nbsp;&nbsp;&nbsp;
                        <a href="#" className="link" onClick={props.onDelete}>
                            Delete
                        </a>
                    </div>
                </div>
            )
        } else {
            // Display origin form view
            return (
                <div className="clearfix">
                    <Component formData={props.formData}
                            onChange={props.onChange}
                            />
                </div>
            )
        }
    }
}

export default formSectionCollapsableDecor
