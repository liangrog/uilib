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
                            <label className={context.theme.required}><em>*</em>Enter a verification code</label>
                            <span className="codemessage">A text message with a verification code was just sent to •••• ••• •76</span>
                            <input type="text"
                                onChange={callback.setStateVal}
                                className={context.theme.inputText}
                                name="code" required autoFocus />
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