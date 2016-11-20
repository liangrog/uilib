import 'whatwg-fetch'

import logger from '../logger'


/**
 * create standard sync actions
 * @param string type actiontypes
 */
export function makeActionCreator(type, ...argNames) {
    return function(...args) {
        let action = { type }
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        })
        return action
    }
}

/**
 * using ES6 fetch
 * for URI access
 *
 * usage:
 *
 * store.dispatch(fetchUri('https://example.com/blah')(
 *  {
 *      subject: blah,
 *      params: {
 *          method: 'POST',
 *          headers: {'Content-Type': 'application/json'},
 *          body: data
 *      },
 *      receiveSubject: receiveBlah
 * })
 */
export const fetchUri =
    uri =>
    action => {

    const {
        subject,
        params = {
            method: 'GET',
            mod: 'cors',
            cache: 'default',
            body: {}
        },
        requestSubject = makeActionCreator('dummy'),
        receiveSubject = () => true,
        onFailure = (error) => logger.log(error, 'exception')
    } = action

    if (typeof receiveSubject != 'function') {
        throw new Error('Expected receiveSubject is a function')
    }

    return (dispatch) => {
        dispatch(requestSubject(subject))
        return fetch(uri, params)
            .then(response => response.json())
            .then(json => dispatch(receiveSubject(subject, json)))
            .catch(onFailure)
    }
}
