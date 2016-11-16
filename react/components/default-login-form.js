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
            <form className="" onSubmit={callback.authenticate}>
                <fieldset>
                    <ul className="">
                        <li className="">
                            <label className="" id="">ID</label>
                            <input type="text" className="" onChange={callback.setStateVal} name="userId" id="userId" required="" />
                            <div className="">Please enter your verified email or phone</div>
                        </li>
                        <li className="">
                            <label className="" id="">Password</label>
                            <input type="password" className="" onChange={callback.setStateVal} name="password" id="password" required="" />
                                <div className="">Show</div>
                                <div className="">Please enter a password</div>
                        </li>
                        <li className="">
                            <div className="">
                                <button className="" type="submit" id="login">Sign into Your Account</button>
                            </div>
                        </li>
                        <li className="">
                            <a className="" id="" href="#">
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
