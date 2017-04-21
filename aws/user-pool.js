import AWS from 'aws-sdk/global'
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider'
import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from 'amazon-cognito-identity-js' // eslint-disable-line

import logger from '../logger'
import ENV_VARS from '../env-vars'

/**
 * User Pool class
 * manage all user actions
 * and authentications
 */
class UserPool {
    /**
     * initiating userPool
     */
    constructor() {
        this.userPool = this.getCognitoUserPool(ENV_VARS.COGNITO_USER_POOL_ID, ENV_VARS.COGNITO_APP_CLIENT_ID)
    }

    /**
     * initialise Cognito user pool
     */
    getCognitoUserPool(userPoolId, clientId) {
        let poolData = {
            UserPoolId: userPoolId,
            ClientId: clientId
        }

        return new CognitoIdentityServiceProvider.CognitoUserPool(poolData)
    }

    /**
     * get Cognito user
     *
     * @param string username
     */
    getCognitoUser(username=null) {
        if (username) {
            let userData = {
                Username : username,
                Pool : this.userPool
            }

            this.cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData)
        } else {
            if (!this.cognitoUser) {
                this.cognitoUser = this.userPool.getCurrentUser()
            }
        }

        return this.cognitoUser
    }

    /**
     * create Cognito user attribute
     * @param string name
     * @param mixed value
     */
    newCognitoAttr(name, value) {
        let attr = {
            Name: name,
            Value: value
        }

        return new CognitoIdentityServiceProvider.CognitoUserAttribute(attr)
    }

    /**
     * validate user registration form
     * data, make sure mandatory fields
     *
     * @param array form_data
     */
    validateRegistyForm(formData) {
        for (let field of ENV_VARS.COGNITO_USER_POOL_MANDATORY_ATTR) {
            if (!formData[field] || formData[field].length <= 0) {
                return new Error('Missing mandatory field')
            }
        }
        return true
    }

    /**
     * only get data we needed for register
     */
    filterRegistryForm(formData) {
        let newFormData = {}
        let allowAttr = ENV_VARS.COGNITO_USER_POOL_STANDARD_ATTR.concat(ENV_VARS.COGNITO_USER_POOL_CUSTOM_ATTR)
        for (let key in formData) {
            if (key != 'username'
                && key != 'password'
                && allowAttr.find((element) => element == key)
                && formData[key].length > 0) {
                newFormData[key] = formData[key]
            }
        }

        return newFormData
    }

    randomUsername(length) {
        let text = ""
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    /**
     * register user
     */
    register(formData, onFailure, onSuccess) {
        // System generated username
        // For easy look up, we use email for username
        formData['username'] = formData.email.replace('@', '-at-').replace(/\./g, '-')

        let invalid = this.validateRegistyForm(formData)

        if (invalid instanceof Error) {
            logger.log(invalid)
            if (typeof onFailure == 'function') {
                return onFailure(invalid)
            }
        }

        let attrList = []

        let newFormData = this.filterRegistryForm(formData)
        for (let key in newFormData) {
            attrList.push(this.newCognitoAttr(key, newFormData[key]))
        }

        if (!formData.locale) {
            //default to Australia
            attrList.push(this.newCognitoAttr('locale', 'en_AU'))
        }

        var callback = (err, result) => {
            if (err) {
                logger.log(err)
                if (typeof onFailure == 'function') {
                    return onFailure(err)
                }
            }
            logger.log(result)
            this.cognitoUser = result.user
            //Enable MFA if user opt-in
            /*if (formData.enable_mfa || formData.enable_mfa == 'true') {
                this.enableMFA(onFailure)
            }*/


            if (typeof onSuccess == 'function') {
                return onSuccess()
            }
        }

        this.userPool.signUp(
            formData.username,
            formData.password,
            attrList,
            null,
            callback
        )
    }

    /**
     * Confirming a registered, unauthenticated user
     * using a confirmation code received via SMS
     */
    registerConfirmByCode(username, code, onFailure, onSuccess) {
        this.getCognitoUser(username).confirmRegistration(
            code,
            true,
            function(err, result) {
                if (err) {
                    logger.log(err)
                    if (typeof onFailure == 'function') {
                        return onFailure(err)
                    }
                }
                logger.log(result)

                if (typeof onSuccess == 'function') {
                    return onSuccess()
                }
            }
        )
    }

    /**
     * Resending a confirmation code via SMS for
     * confirming registration for a unauthenticated user
     */
    resendConfirmCode(username, onFailure) {
        this.getCognitoUser(username).resendConfirmationCode(
            function(err, result) {
                if (err) {
                    logger.log(err)
                    if (typeof onFailure == 'function') {
                        return onFailure(err)
                    }
                    return
                }
                logger.log(result)
            }
        )
    }

    /**
     * Authenticating a user and establishing a user
     * session with the Amazon Cognito Identity service
     */
    authenticate(username, password, conFailure, conSuccess) {
        let authenticationData = {
            Username: username,
            Password: password
        }
        const refreshCallback = (err) => {
            if (err) {
                logger.log(err)
            } else {
                logger.log('Cognito credential has been successfully refreshed !')
            }
        }

        let authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
        var onSuccess = (result) => {
            logger.log('access token + ' + result.getAccessToken().getJwtToken())

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: ENV_VARS.COGNITO_IDENTITY_POOL_ID,
                Logins: {
                    ['cognito-idp.' + ENV_VARS.COGNITO_REGION + '.amazonaws.com/' + ENV_VARS.COGNITO_USER_POOL_ID]: result.getIdToken().getJwtToken()
                }
            })
            
            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh(refreshCallback)

            if (typeof conSuccess == 'function') {
                return conSuccess()
            }
        }

        var onFailure = (err) => {
            logger.log(err)
            if (typeof conFailure == 'function') {
                return conFailure(err)
            }
        }

        this.getCognitoUser(username).authenticateUser(
            authenticationDetails,
            {onSuccess, onFailure, mfaRequired: function() {}}
        )
    }

    /**
     * Retrieve user attributes for an authenticated user
     *
     * @param string attr
     */
    getUserAttr(attr=null, callback) {
        let cb = (err, result) => {
            if (err) {
                logger.log(err)
                callback(err)
            }

            let found = {}
            //find specific attribute value
            if (result && Array.isArray(result)) {
                if (attr !== null) {
                    result = result.find((attr_elm) => attr_elm.getName() == attr)
                    found[result.getName()] = result.getValue()
                } else {
                    result.forEach((ele, index) => {
                        found[ele.getName()] = ele.getValue()
                    })
                }
            }

            callback(null, found)
        }

        this.getCognitoUser().getUserAttributes(cb)
    }

    /**
     * Verify user attribute for an authenticated user
     */
    verifyEmailCode() {
        this.getCognitoUser().getAttributeVerificationCode('email', {
            onSuccess: function (result) {
                logger.log(result)
            },
            onFailure: function(err) {
                logger.log(err)
            },
            inputVerificationCode() {
                //two step varification, call verifyAttr separately
            }
        })
    }

    /**
     * verify attribute with verification code
     *
     * @param string key
     * @param string verificationCode
     */
    verifyAttr(key, verificationCode) {
        this.getCognitoUser().verifyAttribute(key, verificationCode, function(err, result) {
            if (err) {
                logger.log(err)
                return
            }
            logger.log(result)
        })
    }

    /**
     * Delete user attribute for an authenticated user
     *
     * @param array attrList
     */
    deleteAttr(attrList) {
        let attributeList = []
        attrList.forEach(function(field, index) {
            attributeList.push(field)
        })

        this.getCognitoUser().deleteAttributes(attributeList, function(err, result) {
            if (err) {
                logger.log(err)
                return
            }
            logger.log(result)
        })
    }

    /**
     * Update user attributes for an authenticated user
     *
     * @param array attrList
     */
    updateAttr(attrList, callback) {
        let attributeList = []

        for (let key in attrList) {
            attributeList.push(this.newCognitoAttr(key, attrList[key]))
        }

        this.getCognitoUser().updateAttributes(attributeList, function(err, result) {
            if (err) {
                logger.log(err)
                if (typeof callback == 'function') {
                    callback(err)
                }
            }

            logger.log(result)
            if (typeof callback == 'function') {
                callback(null, result)
            }
        })
    }

    /**
     * Enabling MFA for a user on a pool that has
     * an optional MFA setting for an authenticated user
     */
    enableMFA(onFailure) {
        this.getCognitoUser().enableMFA(function(err, result) {
            if (err) {
                logger.log(err)
                if (typeof onFailure == 'function') {
                    return onFailure(err)
                }
            }
            logger.log(result)
        })
    }

    /**
     * Disabling MFA for a user on a pool that has
     * an optional MFA setting for an authenticated user
     */
    disableMFA() {
        this.getCognitoUser().disableMFA(function(err, result) {
            if (err) {
                logger.log(err)
                return
            }
            logger.log(result)
        })
    }

    /**
     * Changing the current password for an authenticated user
     *
     * @param string oldPassword
     * @param string newPassword
     */
    changePassword(oldPassword, newPassword) {
        this.getCognitoUser().changePassword(
            oldPassword,
            newPassword,
            function(err, result) {
                if (err) {
                    logger.log(err)
                    return
                }
                logger.log(result)
            })
    }

    /**
     * forget password start
     * use confirm password in another page
     */
    forgotPassword(username, conFailure, conSuccess) {
        this.getCognitoUser(username).forgotPassword({
            onSuccess: function() {
                logger.log('Code sent')
                if (typeof conSuccess == 'function') {
                    return conSuccess()
                }
            },
            onFailure: function(err) {
                logger.log(err)
                if (typeof conFailure == 'function') {
                    return conFailure(err)
                }
            },
            inputVerificationCode: false
        })
    }

    /**
     * confirm new password
     *
     * @param string verificationCode
     * @param string newPassword
     */
    confirmPassword(verificationCode, newPassword, callback) {
        this.getCognitoUser().confirmPassword(verificationCode, newPassword, callback)
    }

    /**
     * Deleting current authenticated user
     */
    deleteUser() {
        this.getCognitoUser().deleteUser(function(err, result) {
            if (err) {
                logger.log(err)
                return
            }
            logger.log(result)
        })
    }

    /**
     * Signing out from the application
     */
    signout() {
        this.getCognitoUser().signOut()
    }

    /**
     * Global signout for an authenticated
     * user(invalidates all issued tokens)
     */
    globalSignout() {
        this.getCognitoUser().globalSignOut()
    }

    /**
     * Retrieving the current user from local storage
     */
    getUserFromLocal(onFailure, onSuccess) {
        let cognitoUser = this.userPool.getCurrentUser()

        var callback = (err, session) => {
            if (err) {
                logger.log(err)
                if (typeof onFailure == 'function') {
                    return onFailure(err)
                }
            }
            logger.log('session validity: ' + session.isValid())

            this.cognitoUser = cognitoUser
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: ENV_VARS.COGNITO_IDENTITY_POOL_ID,
                Logins : {
                    ['cognito-idp.' + ENV_VARS.COGNITO_REGION + '.amazonaws.com/' + ENV_VARS.COGNITO_USER_POOL_ID]: session.getIdToken().getJwtToken()
                }
            })

            if (typeof onSuccess  == 'function') {
                return onSuccess()
            }
        }

        if (cognitoUser != null) {
            cognitoUser.getSession(callback)
        } else {
            if (typeof onFailure == 'function') {
                return onFailure(new Error('No active user found'))
            }
        }
    }

    /**
     * Integrating User Pools with Cognito Identity
     *
     * @param function when temp credential is successfully refreshed
     * @param function when no user in session
     * @param function when temp credential refresh failed
     */
    integrateUserToIdentityPool(onSuccess, onFailure, onRefreshFailure) {
        let cognitoUser = this.userPool.getCurrentUser()
        var callback = (err, result) => {
            if (err) {
                logger.log(err)
                if (typeof onFailure == 'function') {
                    return onFailure(err)
                }
                return
            }

            if (result) {
                logger.log('You are now logged in.')

                this.cognitoUser = cognitoUser
                // Add the User's Id Token to the Cognito credentials login map.
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: ENV_VARS.COGNITO_IDENTITY_POOL_ID,
                    Logins: {
                        ['cognito-idp.' + ENV_VARS.COGNITO_REGION + '.amazonaws.com/' + ENV_VARS.COGNITO_USER_POOL_ID]: result.getIdToken().getJwtToken()
                    }
                })
            }
        }

        if (cognitoUser != null) {
            cognitoUser.getSession(callback)
            var refreshCallback = (err) => {
                if (err) {
                    logger.log(err)
                    if (typeof onRefreshFailure == 'function') {
                        return onRefreshFailure(err)
                    }
                } else {
                    logger.log('Cognito credential has been successfully refreshed !')
                    if (typeof onSuccess  == 'function') {
                        return onSuccess()
                    }
                }
            }

            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh(refreshCallback)
        }
    }

    /**
     * List all devices for an authenticated user
     *
     * @param integer limit
     * @param string paginationToken
     */
    listDevices(limit=5, paginationToken=null) {
        this.getCognitoUser().listDevices(limit, paginationToken, {
            onSuccess: function (result) {
                logger.log(result)
            },
            onFailure: function(err) {
                logger.log(err)
            }
        })
    }

    /**
     * List information about the current device
     */
    getDevice() {
        this.getCognitoUser().getDevice({
            onSuccess: function(result) {
                logger.log(result)
            },
            onFailure: function(err) {
                logger.log(err)
            }
        })
    }

    /**
     * Remember a device
     */
    rememberDevice() {
        this.getCognitoUser().setDeviceStatusRemembered({
            onSuccess: function(result) {
                logger.log(result)
            },
            onFailure: function(err) {
                logger.log(err)
            }
        })
    }

    /**
     * Do not remember a device
     */
    notRememberDevice() {
        this.getCognitoUser().setDeviceStatusNotRemembered({
            onSuccess: function(result) {
                logger.log(result)
            },
            onFailure: function(err) {
                logger.log(err)
            }
        })
    }

    /**
     * Forget the current device
     */
    forgetDevice() {
        this.getCognitoUser().forgetDevice({
            onSuccess: function(result) {
                logger.log('call result: ' + result)
            },
            onFailure: function(err) {
                logger.log(err)
            }
        })
    }

    isUserLoggedIn() {
        return !!this.userPool.getCurrentUser()
    }
}

var userpool = new UserPool()

export default userpool
