import { collection } from '&config/db';
import Deparment from '../Department';

export const add = async (department: Deparment) => {
  const departments = collection('department');
  const added = await departments.insertOne(department);
  return added;
};
