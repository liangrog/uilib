//system config

export const BASE_ENV = {
    DEBUG: true,
    REDUX_LOGGER_CONFIG: {
        level: 'log',
        duration: true,
        timestamp: true,
        logger: console,
        logErrors: true,
        collapsed: true,
        diff: true
    },
    API_URLS: {
        company: 'https://32gv00hjll.execute-api.ap-southeast-2.amazonaws.com/dev/',
        document: 'https://m9j42ljowb.execute-api.ap-southeast-2.amazonaws.com/dev/',
        job: 'https://y1psyjfwr0.execute-api.ap-southeast-2.amazonaws.com/dev/',
        anzsco: 'https://y1psyjfwr0.execute-api.ap-southeast-2.amazonaws.com/dev/'
    },
    COGNITO_USER_POOL_MANDATORY_ATTR: [
        'email',
        'family_name',
        'given_name',
        'username',
        'password',
    ],
    COGNITO_USER_POOL_STANDARD_ATTR: [
        'address',
        'birthdate',
        'email',
        'family_name',
        'gender',
        'given_name',
        'locale',
        'middle_name',
        'name',
        'nickname',
        'phone_number',
        'picture',
        'preferred_username',
        'profile',
        'timezone',
        'website'
    ],
    COGNITO_USER_POOL_CUSTOM_ATTR: [
        'permissions',
        'roles'
    ]
}



