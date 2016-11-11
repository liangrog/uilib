import React from 'react'

/**
 * default anchor
 */
export const A = (props) => {
    return <a className={props.className} onClick={props.onClick} name={props.name} id={props.id} title={props.title} href={props.href}>
                {props.children}
           </a>
}

A.propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    name: React.PropTypes.string,
    title: React.PropTypes.string,
    href: React.PropTypes.string.isRequired
}

A.defaultProps = {
    id: '',
    className: '',
    href: '#'
}
