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
            <form id="register-form" className="bordered_box" onSubmit={callback.register}>
                <fieldset>
                <ul className="form-list">
                    <li>
                        <label className="required">First name</label>
                        <input type="text" className="input-text" onChange={callback.setStateVal} name="given_name" id="given_name" required="" />
                        <div className="error">Please enter a first name</div>
                    </li>
                    <li>
                        <label className="required">Last name</label>
                        <input type="text" className="input-text" onChange={callback.setStateVal} name="family_name" id="family_name" required="" />
                        <div className="error">Please enter a last name</div>
                    </li>
                    <li>
                        <label className="required">Email address</label>
                        <input type="email" className="input-text" onChange={callback.setStateVal} name="email" id="email" required="" />
                        <div className="error">Please enter an email address</div>
                    </li>
                    <li>
                        <label className="required">Phone number</label>
                        <input type="tel" className="input-text" onChange={callback.setStateVal} name="phone_number" id="phone_number" required="" />
                        <div className="error">Please enter a phone number</div>
                    </li>
                    <li>
                        <label className="required">Password</label>
                        <div className="password-container">
                            <input type="password" className="input-text" onChange={callback.setStateVal} name="password" id="password" required="" />
                            <div className="password-show">
                                <input type="checkbox" id="password_show" className="checkbox visuallyhidden" name="password_show" />
                                <label htmlFor="password_show" className="checkbox_text" title="Show Password">Show</label>
                            </div>
                        </div>
                        <div className="error">Please enter a password</div>
                    </li>
                    <li>
                    By creating an account you agree to the <a href="#" target="_blank">Terms &amp; Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>.
                    </li>
                    <li className="clearfix">
                        <div className="button-set">
                          <button className="btn btn_primary btn_full" type="submit" id="create">Create an (Agent) Account</button>
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
