import React from 'react'


/**
 * default account verification form
 * can swap verification wrapper
 */
const DefaultVerificationForm = (VerificationComponent, context) => (
    <VerificationComponent>
    {
        //callback is the VerificationComponent scope this
        (callback) => (
            <form id="forgot-form" className="bordered_box" onSubmit={callback.verify}>
                <fieldset>
                    <ul className="form-list">
                        <li>
                            <strong>An email was sent to ****@merlingroup.co</strong><br/>
                            <p>Look for the verification email in your inbox and click the link in the email. A confirmation message will appear in your web browser.</p>
                            <strong>Didn't get the email?</strong><br/>
                            <p>Check your spam folder to make sure it didn't end up there. You can also add the email address no-reply@merlingroup.co to your address book and then try sending the email again.</p>
                        </li>
                        <li>
                            <label className="required">Enter a verification code</label>
                            <input type="text"
                                onChange={callback.setStateVal}
                                className="input-text"
                                name="code" required autoFocus />
                        </li>
                        <li className="clearfix">
                            <div className="buttons-set">
                                <div>
                                    <button type="button"
                                        id="cancel" className="btn btn_grey btn_cancel btn_margin"
                                        onClick={callback.cancelVerify}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button type="submit" id="verify" className="btn btn_full btn_has_arrow btn_icon btn_margin">Done</button>
                                </div>
                            </div>
                        </li>
                        <li className="l_center">
                            <div className="buttons-set">
                                <a className="link" id="resend" href={callback.resend}>
                                    Resend Verification Email
                                </a>
                            </div>
                        </li>
                    </ul>
                </fieldset>
            </form>
        )
    }
    </VerificationComponent>
)


export default DefaultVerificationForm
