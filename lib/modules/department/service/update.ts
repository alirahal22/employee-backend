import { DEPARTMENT_COLLECTION } from '&config/collections';
import { update as dbUpdate } from '&config/db';

import Department from '../Department';

export const update = async (id: string, department: Department) => {
  const updated = await dbUpdate(DEPARTMENT_COLLECTION, id, department);
  return updated;
};
