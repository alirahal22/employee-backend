import { EMPLOYEE_COLLECTION } from '&config/collections';
import { findOr, update as dbUpdate } from '&config/db';
import { conflict, internalServerError, makeError } from '&utils/makeError';
import { Logger } from '&utils/logger';

import Employee from '../Employee';
import { get as getDepartment } from '../../department/service/get';
import { get as getBranch } from '../../branch/service/get';
import { isEmpty } from 'lodash';

export const update = async (id: string, employee: Employee) => {
  const { email, phone, branchId, departmentId } = employee;
  /**
   * check if the employee's email or phone are already in use
   * for a different employee.
   */
  const employees: [Employee] = await findOr(EMPLOYEE_COLLECTION, {
    email,
    phone,
  });
  if (
    employees.length > 1 ||
    (employees.length == 1 && employees[0]._id.toString() !== id)
  ) {
    throw conflict();
  }

  /**
   * check if the department is valid
   */
  if (!isEmpty(departmentId)) {
    try {
      await getDepartment(departmentId);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      if (error.status == 404) {
        throw makeError('Department not found', 404);
      }
      throw internalServerError();
    }
  }

  /**
   * check if the branch is valid
   */
  if (!isEmpty(branchId)) {
    try {
      await getBranch(branchId);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      if (error.status == 404) {
        throw makeError('Branch not found', 404);
      }
      throw internalServerError();
    }
  }
  const updated = await dbUpdate(EMPLOYEE_COLLECTION, id, employee);
  return updated;
};
