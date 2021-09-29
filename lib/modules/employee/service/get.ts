import { isEmpty } from 'lodash';

import { find, findById } from '&config/db';
import { Logger } from '&utils/logger';
import { notFoundError } from '&utils/makeError';
import { EMPLOYEE_COLLECTION } from '&config/collections';
import Employee from '../Employee';

export const getAll = async (queryParams) => {
  const employees: [Employee] = await find(EMPLOYEE_COLLECTION, queryParams);
  return employees;
};

export const get = async (id: string) => {
  const employee: Employee = await findById(EMPLOYEE_COLLECTION, id);
  Logger.info(JSON.stringify(employee));
  if (isEmpty(employee)) {
    throw notFoundError();
  }
  return employee;
};
