export interface Error {
  status: number;
  message: string;
  description?: string;
}

/**
 * Single function to generate errors throughout the project.
 * @param message The error message
 * @param status The error status Code
 */
export const makeError = (message: string, status: number): Error => {
  const error: Error = { status: 500, message: 'Internal server error' };
  error.status = status;
  error.message = message;
  return error;
};

export const notFoundError = (): Error => {
  return makeError('Resource not found', 404);
};

export const conflict = (): Error => {
  return makeError('Conflict', 409);
};

export const internalServerError = (): Error => {
  return makeError('Internal Server Error', 500);
};
