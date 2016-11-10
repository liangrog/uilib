import ENV_VARS from '../env-vars'

class Logger {
    /**
     * logger wrapper
     *
     * @param mix msg
     * @param string level
     */
    log = (msg, level='info', ...args) => {
        if (process.env.DEBUG) {
            this[level](msg, ...args)
        }
    }

    info(msg) {
        console.log(msg)
    }
}

var logger = new Logger()

export default logger
