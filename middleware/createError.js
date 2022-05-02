const errorMessages = {
  400: 'Bad Request',
  401: 'Email or password is wrong',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Email in use',
};

const createError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
