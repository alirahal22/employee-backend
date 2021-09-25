import { find } from '../../../config/db';
import Department from '../Department';

export const getAll = async () => {
  const departments: [Department] = await find('department');
  return departments;
};
