import {
  maxLengthRule,
  emailPatternRule,
  minLengthRule,
  passwordPatternRule,
} from '../../utils/validators'

export const loginFormValidationScheme = {
  email: {
    maxLength: maxLengthRule,
    pattern: emailPatternRule,
    required: 'Email must be filled',
  },
  password: {
    maxLength: maxLengthRule,
    minLength: minLengthRule,
    pattern: passwordPatternRule,
    required: 'Password must be filled',
  },
}
