

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
            return prefix + '[' + name + ']'
        } else {
            return name
        }
    }
}


const uiHelper = new UiHelper()
export default uiHelper
