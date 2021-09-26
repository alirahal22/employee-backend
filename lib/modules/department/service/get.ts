import { isEmpty } from 'lodash';

import { find, findById } from '&config/db';
import { Logger } from '&utils/logger';
import { notFoundError } from '&utils/makeError';
import { DEPARTMENT_COLLECTION } from '&config/collections';
import Department from '../Department';

export const getAll = async () => {
  const departments: [Department] = await find(DEPARTMENT_COLLECTION);
  return departments;
};

export const get = async (id: string) => {
  const department: Department = await findById(DEPARTMENT_COLLECTION, id);
  Logger.info(JSON.stringify(department));
  if (isEmpty(department)) {
    throw notFoundError();
  }
  return department;
};
