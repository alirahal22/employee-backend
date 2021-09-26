import { BRANCH_COLLECTION } from '&config/collections';
import { update as dbUpdate } from '&config/db';

import Branch from '../Branch';

export const update = async (id: string, branch: Branch) => {
  const updated = await dbUpdate(BRANCH_COLLECTION, id, branch);
  return updated;
};
