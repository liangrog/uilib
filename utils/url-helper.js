import userpool from '../aws/user-pool'

export const authRedir = (loginUrl='/account/login', homeUrl='/') => {
    return {
        toLogin: function(nextState, replace) {
            let onFailure = (err) => {
                replace({
                    pathname: loginUrl,
                    state: { nextPathname: nextState.location.pathname }
                })
            }

            userpool.getUserFromLocal(onFailure)
        },

        toDashboard: function(nextState, replace) {
            let onSuccess = () => {
                replace(homeUrl)
            }

            userpool.getUserFromLocal((err) => {}, onSuccess)
        }
    }
}

