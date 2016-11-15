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
            <form className={context.theme.verificationForm} onSubmit={callback.verify}>
                <fieldset>
                    <ul className={context.theme.ul}>
                        <li>
                            <strong>An email was sent to ****@merlingroup.co</strong><br/>
                            <p>Look for the verification email in your inbox and click the link in the email. A confirmation message will appear in your web browser.</p>
                            <strong>Didn't get the email?</strong><br/>
                            <p>Check your spam folder to make sure it didn't end up there. You can also add the email address no-reply@merlingroup.co to your address book and then try sending the email again.</p>
                        </li>
                        <li>
                            <label className={context.theme.required}><em>*</em>Enter a verification code</label>
                            <input type="text"
                                onChange={callback.setStateVal}
                                className={context.theme.inputText}
                                name="code" required autoFocus />
                        </li>
                        <li className={context.theme.clearfix}>
                            <div className={context.theme.buttonSet}>
                                <button className={context.theme.btnFull} id="resend" onClick={callback.resend}>
                                    Resend Verification Email
                                </button>
                            </div>
                        </li>
                        <li className={context.theme.clearfix}>
                            <div className={context.theme.buttonSet}>
                                <div>
                                    <button type="button"
                                        id="cancel" className={context.theme.btnCancel}
                                        onClick={callback.cancelVerify}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button type="submit" id="verify" className={context.theme.btnFull}>Done</button>
                                </div>
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