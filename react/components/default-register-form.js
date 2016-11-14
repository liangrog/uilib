import React from 'react'


/**
 * default account registration form
 * can swap registration wrapper
 */
const DefaultRegisterForm = (RegisterComponent, context) => (
    <RegisterComponent>
    {
        //callback is the RegisterComponent scope this
        (callback) => (
            <form className={context.theme.registerForm} onSubmit={callback.register}>
                <fieldset>
                <ul className={context.theme.ul}>
                    <li className={context.theme.error}>
                        <label className={context.theme.required} id="">First name</label>
                        <input type="text" className={context.theme.inputText} onChange={callback.setStateVal} name="given_name" id="given_name" required="" />
                        <div className={context.theme.error}>Please enter a first name</div>
                    </li>
                    <li className={context.theme.error}>
                        <label className={context.theme.required} id="">Last name</label>
                        <input type="text" className={context.theme.inputText} onChange={callback.setStateVal} name="family_name" id="family_name" required="" />
                        <div className={context.theme.error}>Please enter a last name</div>
                    </li>
                    <li className={context.theme.error}>
                        <label className={context.theme.required} id="">Email address</label>
                        <input type="email" className={context.theme.inputText} onChange={callback.setStateVal} name="email" id="email" required="" />
                        <div className={context.theme.error}>Please enter an email address</div>
                    </li>
                    <li className={context.theme.error}>
                        <label className={context.theme.required} id="">Phone number</label>
                        <input type="tel" className={context.theme.inputText} onChange={callback.setStateVal} name="phone_number" id="phone_number" required="" />
                        <div className={context.theme.error}>Please enter an email address</div>
                    </li>
                    <li className={context.theme.passwordGroup + ' ' + context.theme.error}>
                        <label className={context.theme.required} id="">Password</label>
                        <input type="password" className={context.theme.required} onChange={callback.setStateVal} name="password" id="password" required="" />
                        <div className={context.theme.passwordShowToggle}>Show</div>
                        <div className={context.theme.error}>Please enter a password</div>
                    </li>
                    <li>
                    By creating an account you agree to the <a href="#" target="_blank">Terms &amp; Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>.
                    </li>
                    <li className={context.theme.clearfix}>
                        <div className={context.theme.buttonsSet}>
                          <button className={context.theme.buttonFull} type="submit" id="create">Create an Agent Account</button>
                        </div>
                    </li>
                </ul>
                </fieldset>
            </form>
        ) 
    }
    </RegisterComponent>
)


export default DefaultRegisterForm
