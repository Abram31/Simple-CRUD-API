export const routes = {
  users: 'users',
};
export const bodyValues = ['username', 'age', 'hobbies'];

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ERR = {
  USERID_INVALID: 'User id is invalid',
  USER_NOT_FOUND: 'User not found',
  BODY_INVALID_FORMAT: 'Invalid request body format',
  BODY_VALIDATION: 'Request body does not contain required fields',
  UNSUPPORTED_OPERATION: 'Unsupported operation',
  RESOURCE_NOT_FOUND: "Requested resource doesn't exist",
  UNEXPECTED_ERROR: 'Unexpected error has occured, try again later',
};
