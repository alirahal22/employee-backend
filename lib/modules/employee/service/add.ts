import { EMPLOYEE_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Employee from '../Employee';
import { get as getDepartment } from '../../department/service/get';
import { get as getBranch } from '../../branch/service/get';
import { internalServerError, makeError } from '&utils/makeError';
import { Logger } from '&utils/logger';

export const add = async (employee: Employee) => {
  try {
    await getDepartment(employee.departmentId);
  } catch (error) {
    Logger.error(JSON.stringify(error));
    if (error.status == 404) {
      throw makeError('Department not found', 404);
    }
    throw internalServerError();
  }

  try {
    await getBranch(employee.branchId);
  } catch (error) {
    Logger.error(JSON.stringify(error));
    if (error.status == 404) {
      throw makeError('Branch not found', 404);
    }
    throw internalServerError();
  }

  const added = await insert(EMPLOYEE_COLLECTION, employee);
  return added;
};
