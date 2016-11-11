import {BASE_ENV} from './base'

var ENV_VARS = null;

if (process.env.NODE_ENV == 'development') {
    const DEV_ENV = require('./dev.js');
    ENV_VARS = {
        ...BASE_ENV, ...DEV_ENV.ENV
    };
}

if (process.env.NODE_ENV == 'production') {
    const PROD_ENV = require('./production.js');
    ENV_VARS = {
        ...BASE_ENV, ...PROD_ENV.ENV
    };
}

export default ENV_VARS