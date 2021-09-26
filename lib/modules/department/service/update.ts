import { update as dbUpdate } from '&config/db';
import Deparment from '../Department';

export const update = async (id: string, department: Deparment) => {
  const updated = await dbUpdate('department', id, department);
  return updated;
};
