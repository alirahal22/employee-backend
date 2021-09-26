import { EMPLOYEE_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Employee from '../Employee';

export const add = async (employee: Employee) => {
  const added = await insert(EMPLOYEE_COLLECTION, employee);
  return added;
};
