import React from 'react'
import Immutable from 'immutable'

class Util {
    ifDebug() {
        return process.env.DEBUG || process.env.DEBUG == 'true'
    }

    // Process the form input value to be NoSQL friendly
    valForNoSQL(target) {
        var value = target.val()
        // Convert checkbox to boolean
        if (value == 'boolean' && target.attr('type') == 'checkbox') {
            value = target.prop('checked')
        }
        // Convert radio to boolean
        if (target.attr('type') == 'radio') {
            if (value === 'true') {
                value = true
            } else if (value === 'false') {
                value = false
            }
        }
        // Convert number to number
        if (target.attr('type') == 'number') {
            if (value === '' || isNaN(value)) {
                value = null
            } else {
                value = parseInt(value)
            }
        }

        return value
    }

    // Return value if value is defined, or default to x
    valOr(val, x='') {
        if (val === undefined || val === null || val === "") {
            return x
        } else {
            return val
        }
    }

    // Return boolean
    checkOr(checked) {
        return checked ? true : false
    }

    // Make the deep path name
    makeName(prefix, name) {
        if (prefix) {
            return prefix + '[' + name + ']'
        } else {
            return name
        }
    }

    // Assign a deep path value to a json object
    deepAssign(obj, path, value) {
        var pathArray = path.split(/\[|\]/).filter(n => {return n !== ''})

        if (pathArray.length == 1) {
            obj[pathArray[0]] = value
            return obj
        } else {
            var o = obj
            // Create level by level
            for (let i = 0; i < pathArray.length-1; i++) {
                var p = pathArray[i]
                if (o[p] === undefined) {
                    var pNext = pathArray[i+1]
                    if (isNaN(pNext)) {
                        o[p] = {}
                    } else {
                        o[p] = []
                    }
                }
                o = o[p]
            }
            o[pathArray.pop()] = value
            return obj
        }
    }

    // Filter json
    // Not in used
    filter(obj, name, value) {
        return $.grep(obj, (o) => {
            return o[name] === value;
        });
    }

    // Clone some data
    clone(data) {
        if (data !== null) {
            if (data instanceof Array) {
                return $.extend(true, [], data)
            } else if (typeof data === 'object') {
                return $.extend(true, {}, data)
            } else {
                return data
            }
        } else {
            return null
        }
    }

    // Get the year begin and end of the last financial year
    lastFinancialYear() {
        var year = {}
        var today = new Date()
        var curMonth = today.getMonth()
        if (curMonth >= 6) {
            year = {
                year_from: today.getFullYear() - 1,
                year_to: today.getFullYear()
            }
        } else {
            year = {
                year_from: today.getFullYear() - 2,
                year_to: today.getFullYear() - 1
            }
        }

        return year
    }

    // Replace label string with a value from some data, based on regex
    replaceLabel(label, regex, data) {
        let newLabel
        let match
        if (match = label.match(/\[(.*)\]/)) {
            newLabel = label.replace(match[0], Immutable.fromJS(data).getIn(match[1].split('.'), ''))
        } else {
            newLabel = label
        }

        return newLabel
    }

}

var util = new Util()

export default util
