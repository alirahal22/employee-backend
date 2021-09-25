export interface Error {
  status: number;
  message: string;
}

export const makeError = (message: string, status: number): Error => {
  const error = { status: 500, ...new Error() };
  error.status = status;
  error.message = message;
  return error;
};
