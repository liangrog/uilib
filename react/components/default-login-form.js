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
            <form className={context.theme.loginForm} onSubmit={callback.authenticate}>
                <fieldset>
                    <ul className={context.theme.ul}>
                        <li className={context.theme.error}>
                            <label className={context.theme.required} id="">ID</label>
                            <input type="text" className={context.theme.inputText} onChange={callback.setStateVal} name="userId" id="userId" required="" />
                            <div className={context.theme.error}>Please enter your verified email or phone</div>
                        </li>
                        <li className={context.theme.passwordGroup + ' ' + context.theme.error}>
                            <label className={context.theme.required} id="">Password</label>
                            <input type="password" className={context.theme.inputText} onChange={callback.setStateVal} name="password" id="password" required="" />
                                <div className={context.theme.passwordShowToggle}>Show</div>
                                <div className={context.theme.error}>Please enter a password</div>
                        </li>
                        <li className={context.theme.clearfix}>
                            <div className={context.theme.buttonsSet}>
                                <button className={context.theme.btnFull} type="submit" id="login">Sign into Your Account</button>
                            </div>
                        </li>
                        <li className={context.theme.l_center + ' ' + context.theme.control}>
                            <a className={context.theme.forgotPasswordLink} id="" href="#">
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
