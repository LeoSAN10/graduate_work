import {
  maxLengthRule,
  minLengthRule,
  requiredRule,
  patternRule,
} from '../../utils/validatorPage'

export const getValidationScheme = {
  name: {
    minLength: minLengthRule(3),
    maxLength: maxLengthRule(20),
    pattern: patternRule(
      /^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/,
      ' correct full name. Please check'
    ),
    required: requiredRule().message,
  },
  email: {
    maxLength: maxLengthRule(30),
    pattern: patternRule(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'correct email address'
    ),
    required: requiredRule().message,
  },
  phone: {
    minLength: minLengthRule(7),
    maxLength: maxLengthRule(30),
    pattern: patternRule(/^[+]?[0-9]{7,14}$/, 'correct phone'),
    required: requiredRule().message,
  },
  password: {
    minLength: minLengthRule(8),
    maxLength: maxLengthRule(20),
    pattern: patternRule(
      /[0-9a-zA-Z]{8,20}/,
      'latin characters and numbers only'
    ),
    required: requiredRule().message,
  },
  repeatPassword: {
    required: requiredRule().message,
  },
}
