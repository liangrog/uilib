import React from 'react'

import Password from './password'


/**
 * default login form
 * can swap authentication wrapper
 */
const DefaultLoginForm =
    AuthComponent =>
    ( { userLabel = 'ID', passwordLabel = 'Password', submitLabel = 'Sign into Your Account' } = {} )  => {

    return (
        <AuthComponent>
        {
            //callback is the AuthComponent scope this
            (callback) => (
                <form id="login-form" className="bordered_box" onSubmit={callback.authenticate}>
                    <fieldset>
                        <ul className="form-list">
                            <li>
                                <label className="required">{ userLabel } <span className="optional">(email or mobile)</span></label>
                                <input type="text" className="input-text" onChange={callback.setStateVal} autoFocus name="userId" id="userId" required="" />
                                {/*<div className="error">Please enter your verified email or mobile number</div>*/}
                            </li>
                            <li>
                                <label className="required">{ passwordLabel }</label>
                                <div className="password-container">
                                    <Password onChange={callback.setStateVal} password={callback.getStateVal('password')}/>
                                </div>
                                {/*<div className="error">Please enter a password</div>*/}
                            </li>
                            <li className="clearfix">
                                <div className="buttons-set">
                                    <button className="btn btn_primary btn_full btn_margin_small" type="submit" id="login" title="">{ submitLabel }</button>
                                </div>
                            </li>
                            <li className="l_center control">
                                <a className="forgot-password-link" href="/account/forgotpassword">
                                    <span>Forgot Your Password?</span>
                                </a>
                            </li>
                        </ul>
                    </fieldset>
                </form>
            )
        }
        </AuthComponent>
    )

}


export default DefaultLoginForm
