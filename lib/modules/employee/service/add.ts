import { EMPLOYEE_COLLECTION } from '&/lib/config/collections';
import { insert, exists } from '&config/db';
import Employee from '../Employee';
import { get as getDepartment } from '../../department/service/get';
import { get as getBranch } from '../../branch/service/get';
import { conflict, internalServerError, makeError } from '&utils/makeError';
import { Logger } from '&utils/logger';

export const add = async (employee: Employee) => {
  const { email, phone, branchId, departmentId } = employee;

  /**
   * check if the employee's email or phone are already in use
   */
  const employeeExists = await exists(EMPLOYEE_COLLECTION, { email, phone });
  if (employeeExists) throw conflict();

  /**
   * check if the department is valid
   */
  try {
    await getDepartment(departmentId);
  } catch (error) {
    Logger.error(JSON.stringify(error));
    if (error.status == 404) {
      throw makeError('Department not found', 404);
    }
    throw internalServerError();
  }

  /**
   * check if the branch is valid
   */
  try {
    await getBranch(branchId);
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
