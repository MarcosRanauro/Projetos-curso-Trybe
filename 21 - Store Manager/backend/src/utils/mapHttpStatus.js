const httpStatusCode = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  MISSING_VALUES: 400,
  INVALID_VALUES: 422,
};

const mapHttpStatus = (status) => httpStatusCode[status] || 500;

module.exports = mapHttpStatus;