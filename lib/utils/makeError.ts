export interface Error {
  statusCode: number;
  message: string;
  description?: string;
}

/**
 * Single function to generate errors throughout the project.
 * @param message The error message
 * @param status The error status Code
 */
export const makeError = (message: string, statusCode: number): Error => {
  const error: Error = { statusCode: 500, message: 'Internal server error' };
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
