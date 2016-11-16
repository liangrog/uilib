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
            <form className="" onSubmit={callback.verify}>
                <fieldset>
                    <ul className="">
                        <li>
                            <strong>An email was sent to ****@merlingroup.co</strong><br/>
                            <p>Look for the verification email in your inbox and click the link in the email. A confirmation message will appear in your web browser.</p>
                            <strong>Didn't get the email?</strong><br/>
                            <p>Check your spam folder to make sure it didn't end up there. You can also add the email address no-reply@merlingroup.co to your address book and then try sending the email again.</p>
                        </li>
                        <li>
                            <label className=""><em>*</em>Enter a verification code</label>
                            <input type="text"
                                onChange={callback.setStateVal}
                                className=""
                                name="code" required autoFocus />
                        </li>
                        <li className="">
                            <div className="">
                                <button className="" id="resend" onClick={callback.resend}>
                                    Resend Verification Email
                                </button>
                            </div>
                        </li>
                        <li className="">
                            <div className="">
                                <div>
                                    <button type="button"
                                        id="cancel" className=""
                                        onClick={callback.cancelVerify}>
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button type="submit" id="verify" className="">Done</button>
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