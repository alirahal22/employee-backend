import { EMPLOYEE_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Employee from '../Employee';
import { get as getDepartment } from '../../department/service/get';
import { get as getBranch } from '../../branch/service/get';
import { makeError } from '&utils/makeError';

export const add = async (employee: Employee) => {
  try {
    await getDepartment(employee.departmentId);
  } catch (error) {
    if (error.status == 404) throw makeError('Department not found', 404);
  }

  try {
    await getBranch(employee.branchId);
  } catch (error) {
    if (error.status == 404) throw makeError('Branch not found', 404);
  }

  const added = await insert(EMPLOYEE_COLLECTION, employee);
  return added;
};
