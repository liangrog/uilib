import ENV_VARS from '../env-config'

class Logger {
    /**
     * logger wrapper
     *
     * @param mix msg
     * @param string level
     */
    log = (msg, level='info', ...args) => {
        if (ENV_VARS.DEBUG == true || process.env.DEBUG == true || process.env.DEBUG == 'true') {
            this[level](msg, ...args)
        }
    }

    info(msg) {
        console.log(msg)
    }
}

var logger = new Logger()

export default logger
