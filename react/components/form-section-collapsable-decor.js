import React from 'react'


const formSectionCollapsableDecor = (Component) => {

    return (props) => {

        if (props.collapsed) {
            // Display collapsed view
            return (
                <div className="l_full new-child">
                    <div className="clearfix">
                        <div className="l_span_9">
                            {
                                props.collapsedDisplayAttrs.map(
                                    (attr, i) => (
                                        <a href="#" className="link" onClick={props.onExpand}>
                                            <span key={i}>
                                                {props.formData[attr]} &nbsp;
                                            </span>
                                        </a>
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
                            formData={props.formData}
                            onChange={props.onChange}
                            />
                </div>
            )
        }
    }
}

export default formSectionCollapsableDecor
