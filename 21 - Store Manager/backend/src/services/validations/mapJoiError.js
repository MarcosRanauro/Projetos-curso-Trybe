const joiError = {
  'any.required': 'MISSING_VALUES',
  'string.min': 'INVALID_VALUES',
};

const mapJoiError = (joiErrorType) => joiError[joiErrorType] || 'INVALID_VALUES';

module.exports = mapJoiError;