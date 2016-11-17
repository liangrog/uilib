import React from 'react'

import Password from './password'


/**
 * default login form
 * can swap authentication wrapper
 */
const DefaultLoginForm = 
    AuthComponent => 
    ( { userLabel = 'Your Login ID', passwordLabel = 'Password', submitLabel = 'Sign into Your Account', ...args } = {} )  => {

    return (
        <AuthComponent>
        {
            //callback is the AuthComponent scope this
            (callback) => (
                <form id="login-form" className="bordered_box" onSubmit={callback.authenticate}>
                    <fieldset>
                        <ul className="form-list">
                            <li>
                                <label className="required">{ userLabel }</label>
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
                                    <button className="btn btn_large btn_full" type="submit" id="login">{ submitLabel }</button>
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
