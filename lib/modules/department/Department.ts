import BaseEntity from '&/lib/utils/BaseEntity';

export default interface Department extends BaseEntity {
  name: string;
  description: string;
}
