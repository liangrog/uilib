

class AppHelper {
    ifDebug() {
        return process.env.DEBUG || process.env.DEBUG == 'true'
    }
}


const appHelper = new AppHelper()
export default appHelper
