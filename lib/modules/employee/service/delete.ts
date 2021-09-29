import { EMPLOYEE_COLLECTION } from '&config/collections';
import { remove } from '&config/db';
import { Logger } from '&utils/logger';

import { isEmpty } from 'lodash';
import { get } from '&modules/employee/service/get';

export const _delete = async (id: string) => {
  const employee = await get(id);
  if (!isEmpty(employee)) {
    await remove(EMPLOYEE_COLLECTION, id);
  }
};
