import { isEmpty } from 'lodash';

import { find, findById } from '&config/db';
import { Logger } from '&utils/logger';
import { notFoundError } from '&utils/makeError';
import { BRANCH_COLLECTION } from '&config/collections';
import Branch from '../Branch';

export const getAll = async (queryParams) => {
  const branches: [Branch] = await find(BRANCH_COLLECTION, queryParams);
  return branches;
};

export const get = async (id: string) => {
  const branch: Branch = await findById(BRANCH_COLLECTION, id);
  Logger.info(JSON.stringify(branch));
  if (isEmpty(branch)) {
    throw notFoundError();
  }
  return branch;
};
