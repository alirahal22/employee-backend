import { DEPARTMENT_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Deparment from '../Department';

export const add = async (department: Deparment) => {
  const added = await insert(DEPARTMENT_COLLECTION, department);
  return added;
};
