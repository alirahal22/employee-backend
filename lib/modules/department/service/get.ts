import { find, findById } from '../../../config/db';
import Department from '../Department';
import { Logger } from '../../../utils/logger';
import { isEmpty } from 'lodash';
import { notFoundError } from '&/lib/utils/makeError';

const COLLECTION_NAME = 'department';

export const getAll = async () => {
  const departments: [Department] = await find(COLLECTION_NAME);
  return departments;
};

export const get = async (id: string) => {
  const department: Department = await findById(COLLECTION_NAME, id);
  Logger.info(JSON.stringify(department));
  if (isEmpty(department)) {
    throw notFoundError();
  }
  return department;
};
