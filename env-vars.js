
/**
 * Config Loading sequence: PRODUCTION => STAGING/DEVELOPMENT
 *
 * Reason: so that we don't need to shuffle
 * variables upstream when developing/deploying
 */

//default load production config
let PRO_ENV = require('../config/production.js')
let ENV_VARS = PRO_ENV.ENV

switch (process.env.NODE_ENV) {
    case 'staging':
        //override with staging config
        let STG_ENV = require('../config/staging.js')
        ENV_VARS = Object.assign({}, ENV_VARS, STG_ENV.ENV)
        break
    case 'test':
    case 'development':
        //override with development config
        let DEV_ENV = require('../config/development.js')
        ENV_VARS = Object.assign({}, ENV_VARS, DEV_ENV.ENV)
        break
}

export default ENV_VARS
