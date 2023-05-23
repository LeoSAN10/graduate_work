export const minLengthRule = (value) => {
    return {
        value: value,
        message: `Should contain no less than ${value} characters`
    }
}

export const maxLengthRule = (value) => {
    return {
        value: value,
        message:`Should contain no more than ${value} characters`
    }
}

export const requiredRule = () => {
    return {
        message: `The field must be filled`
    }
}

export const patternRule = (pattern, restrictions) =>{
    return {
        value: pattern,
        message: `Should contain ${restrictions}`
    }
}
