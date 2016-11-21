

class UiHelper {
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
            return `${prefix}[${name}]`
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
}


const uiHelper = new UiHelper()
export default uiHelper
