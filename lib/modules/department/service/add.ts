import { DEPARTMENT_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Department from '../Department';

export const add = async (department: Department) => {
  const added = await insert(DEPARTMENT_COLLECTION, department);
  return added;
};
