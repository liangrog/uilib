import React from 'react'

import Password from './password'
import Telephone from './telephone'

/**
 * default account registration form
 * can swap registration wrapper
 */
const DefaultRegisterForm = 
    RegisterComponent => 
    ({ nextPath = '/account/verification', submitLabel = 'Create', ...args} = {}) => (

    <RegisterComponent successPath={nextPath}>
    {
        //callback is the RegisterComponent scope this
        (callback) => (
            <form id="register-form" className="bordered_box" onSubmit={callback.register}>
                <fieldset>
                    <ul className="form-list">
                        <li>
                            <label className="required">First name</label>
                            <input type="text" autoFocus="focus" className="input-text" onChange={callback.setStateVal} name="given_name" id="given_name" required="" />
                            {/*<div className="error">Please enter a first name</div>*/}
                        </li>
                        <li>
                            <label className="required">Last name</label>
                            <input type="text" className="input-text" onChange={callback.setStateVal} name="family_name" id="family_name" required="" />
                            {/*<div className=error"">Please enter a last name</div>*/}
                        </li>
                        <li>
                            <label className="required">Email address</label>
                            <input type="email" className="input-text" onChange={callback.setStateVal} name="email" id="email" required="" />
                            {/*<div className="error">Please enter an email address</div>*/}
                        </li>
                        <li>
                            <label className="required">Phone number</label>
                            <Telephone onChange={callback.setStateVal} name="phone_number" id="phone_number" required="" />
                            {/*<div className="error">Please enter an email address</div>*/}
                        </li>
                        <li>
                            <label className="required">Password</label>
                            <div className="password-container">
                                <Password onChange={callback.setStateVal} password={callback.getStateVal('password')}/>
                            </div>
                        </li>
                        <li>
                            By creating an account you agree to the <a href="#" target="_blank" className="link_secondary">Terms &amp; Conditions</a> and <a href="#" target="_blank" className="link_secondary">Privacy Policy</a>.
                        </li>
                        <li className="clearfix">
                            <div className="button-set">
                              <button className="btn btn_primary btn_full btn_margin" type="submit" id="create">{ submitLabel }</button>
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
