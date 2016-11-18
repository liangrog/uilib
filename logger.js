

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

    error(msg) {
        console.error(msg)
    }

    warn(msg) {
        console.warn(msg)
    }

    exception(msg) {
        console.exception(msg)
    }

}

var logger = new Logger()

export default logger
