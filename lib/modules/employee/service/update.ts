import { EMPLOYEE_COLLECTION } from '&config/collections';
import { update as dbUpdate } from '&config/db';
import { internalServerError, makeError } from '&utils/makeError';
import { Logger } from '&utils/logger';

import Employee from '../Employee';
import { get as getDepartment } from '../../department/service/get';
import { get as getBranch } from '../../branch/service/get';
import { isEmpty } from 'lodash';

export const update = async (id: string, employee: Employee) => {
  if (!isEmpty(employee.departmentId)) {
    try {
      await getDepartment(employee.departmentId);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      if (error.status == 404) {
        throw makeError('Department not found', 404);
      }
      throw internalServerError();
    }
  }

  if (!isEmpty(employee.branchId)) {
    try {
      await getBranch(employee.branchId);
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
