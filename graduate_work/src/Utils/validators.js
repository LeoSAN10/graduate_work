export const minLengthRule = {
  value: 8,
  message: 'this field should contain minimum 8 characters',
}

export const maxLengthRule = {
  value: 30,
  message: 'this field should contain maximum 30 characters',
}

export const emailPatternRule = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Incorrect email format',
}

export const passwordPatternRule = {
  value: /[0-9a-zA-Z]{8,20}/,
  message: 'Password should contain latin symbols and numbers',
}

export const phonePatternRule = {
  value: /^[+]?[0-9]{7,14}$/,
  message: 'Incorrect phone format',
}

export const namePatternRule = {
  value: /^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/,
  message: 'correct full name. Please check',
}
