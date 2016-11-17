import React from 'react'

import Password from './password'


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
            <form className="" onSubmit={callback.register}>
                <fieldset>
                    <ul className="">
                        <li className="">
                            <label className="" id="">First name</label>
                            <input type="text" className="" onChange={callback.setStateVal} name="given_name" id="given_name" required="" />
                            {/*<div className="">Please enter a first name</div>*/}
                        </li>
                        <li className="">
                            <label className="" id="">Last name</label>
                            <input type="text" className="" onChange={callback.setStateVal} name="family_name" id="family_name" required="" />
                            {/*<div className="">Please enter a last name</div>*/}
                        </li>
                        <li className="">
                            <label className="" id="">Email address</label>
                            <input type="email" className="" onChange={callback.setStateVal} name="email" id="email" required="" />
                            {/*<div className="">Please enter an email address</div>*/}
                        </li>
                        <li className="">
                            <label className="" id="">Phone number</label>
                            <input type="tel" className="" onChange={callback.setStateVal} name="phone_number" id="phone_number" required="" />
                            {/*<div className="">Please enter an email address</div>*/}
                        </li>
                        <li className="">
                            <label className="required">Password</label>
                            <div className="password-container">
                                <Password onChange={callback.setStateVal} password={callback.getStateVal('password')}/>
                            </div>
                        </li>
                        <li>
                            By creating an account you agree to the <a href="#" target="_blank">Terms &amp; Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>.
                        </li>
                        <li className="">
                            <div className="">
                              <button className="" type="submit" id="create">{ submitLabel }</button>
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
