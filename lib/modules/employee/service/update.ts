import { EMPLOYEE_COLLECTION } from '&config/collections';
import { update as dbUpdate } from '&config/db';

import Employee from '../Employee';

export const update = async (id: string, employee: Employee) => {
  const updated = await dbUpdate(EMPLOYEE_COLLECTION, id, employee);
  return updated;
};
