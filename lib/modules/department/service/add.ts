import { insert } from '&config/db';
import Deparment from '../Department';

export const add = async (department: Deparment) => {
  const added = await insert('department', department);
  return added;
};
