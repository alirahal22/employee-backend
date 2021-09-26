import { BRANCH_COLLECTION } from '&/lib/config/collections';
import { insert } from '&config/db';
import Branch from '../Branch';

export const add = async (branch: Branch) => {
  const added = await insert(BRANCH_COLLECTION, branch);
  return added;
};
