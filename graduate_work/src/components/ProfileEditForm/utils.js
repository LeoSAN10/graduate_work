import {
  maxLengthRule,
  minLengthRule,
  requiredRule,
} from '../../utils/validatorPage'
import {
  emailPatternRule,
  phonePatternRule,
  namePatternRule,
} from '../../utils/validators'

export const getValidationScheme = {
  name: {
    minLength: minLengthRule(3),
    maxLength: maxLengthRule(20),
    pattern: namePatternRule,
    required: requiredRule().message,
  },
  email: {
    maxLength: maxLengthRule(30),
    pattern: emailPatternRule,
    required: requiredRule().message,
  },
  phone: {
    minLength: minLengthRule(7),
    maxLength: maxLengthRule(30),
    pattern: phonePatternRule,
    required: requiredRule().message,
  },
}
