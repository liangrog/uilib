import React from 'react'


/**
 * default login form
 * can swap authentication wrapper
 */
const DefaultLoginForm = (AuthComponent, context) => (
    <AuthComponent>
    {
        //callback is the AuthComponent scope this
        (callback) => (
            <form id="login-form" className="bordered_box" onSubmit={callback.authenticate}>
                <fieldset>
                    <ul className="form-list">
                        <li>
                            <label className="required">Email address or mobile</label>
                            <input type="text" className="input-text" onChange={callback.setStateVal} autoFocus name="userId" id="userId" required="" />
                            <div className="error">Please enter your verified email or mobile number</div>
                        </li>
                        <li>
                            <label className="required">Password</label>
                            <div className="password-container">
                                <input type="password" className="input-text" onChange={callback.setStateVal} name="password" id="password" required="" />
                                    <div className="password-show">
                                        <input type="checkbox" id="associated_entity" className="checkbox visuallyhidden" name="associated_entity" />
                                        <label htmlFor="associated_entity" className="checkbox_text" title="">Show</label>
                                    </div>
                            </div>
                                <div className="error">Please enter a password</div>
                        </li>
                        <li className="clearfix">
                            <div className="buttons-set">
                                <button className="btn btn_large btn_full" type="submit" id="login">Sign into Your Account</button>
                            </div>
                        </li>
                        <li className="l_center control">
                            <a className="forgot-password-link" href="#">
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


export default DefaultLoginForm
