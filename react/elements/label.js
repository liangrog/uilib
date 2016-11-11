import React from 'react'

/**
 * default label
 */
export const Label = (props) => {
    let em = props.required == true ? (<em>*</em>) : ''
    return <label className={props.className} onClick={props.onClick} name={props.name} id={props.id} htmlFor={props.htmlFor}>
                {em}
                {props.children}
           </label>
}

Label.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    name: React.PropTypes.string,
    htmlFor: React.PropTypes.string
}

Label.defaultProps = {
    id: '',
    className: ''
}
