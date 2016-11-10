import React from 'react'

/**
 * default button
 */
export const Button = (props) => {
    return <button className={'btn' + ' ' + props.className} onClick={props.onClick} type={props.type} name={props.name} id={props.id} autoFocus={props.autoFocus}>
                {props.children}
           </button>
}

Button.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    type: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    autoFocus: React.PropTypes.bool
}

Button.defaultProps = {
    id: '',
    className: '',
    type: 'button',
    autoFocus: false
}
