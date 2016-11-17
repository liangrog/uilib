

class AppHelper {
    /**
     * generate random number
     * */
    rand(len=10) {
        return Math.floor(Math.random() * len)
    }

    /**
     * if it's debug mode
     * */
    ifDebug() {
        return process.env.DEBUG || process.env.DEBUG == 'true'
    }
}


const appHelper = new AppHelper()
export default appHelper
