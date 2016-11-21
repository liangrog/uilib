

class AppHelper {
    /**
     * generate random number
     * */
    rand(len=3) {
        return Math.floor(Math.random() * Math.pow(10, len))
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
