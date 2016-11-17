import React from 'react'

import Password from './password'


/**
 * default password reset form
 * can swap password reset wrapper
 */
const DefaultPasswordResetForm = 
    PasswordResetComponent =>
    ( { idLabel = 'ID (email or mobile)', sendCodeLabel = 'Send Code', ...args } = {} ) => (

    <PasswordResetComponent>
    {
        //callback is the PasswordResetComponent scope this
        (callback) => (
            <div>
                <form id="forgot-form" className="bordered_box" onSubmit={callback.sendCode}>
                    <fieldset>
                    <ul className="form-list">
                        <li>
                            <label className="required">{ idLabel }</label>
                            <input type="text" className="input-text"
                                onChange={callback.setStateVal} name="id" id="id" required="" />
                                {/*<div className="error">Please enter an email or phone number</div>*/}
                        </li>
                        <li className="clearfix">
                            <ul>
                                <li className="l_half">
                                    <div className="buttons-set">
                                        <button className="btn btn_secondary btn_margin" id="cancel" onClick={callback.cancelReset}>Cancel</button>
                                    </div>
                                </li>
                                <li className="l_half l_last">
                                    <div className="buttons-set">
                                        <button className="btn btn_primary btn_right btn_margin" type="submit" id="send">{ sendCodeLabel }</button>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </fieldset>
                    <fieldset>
                    {
                        callback.state.isActive && 
                            ( 
                                <ul>
                                    <li>
                                    <label className="required">Security Code</label>
                                    <input type="text" className="input-text"
                                        onChange={callback.setStateVal} name="code" id="code" required="" />
                                </li>

                                    <li>
                                        <label className="required">New password</label>
                                        <div className="password-container">
                                            <Password onChange={callback.setStateVal} password={callback.getStateVal('password')} /> 
                                        </div>
                                    </li>
                                </ul>
                            )
                    }
                    </fieldset>
                </form>
            </div>
        )
    }
    </PasswordResetComponent>
)


export default DefaultPasswordResetForm
