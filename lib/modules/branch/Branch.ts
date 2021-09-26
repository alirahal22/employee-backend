import BaseEntity from '&/lib/utils/BaseEntity';

export default interface Branch extends BaseEntity {
  name: string;
  country: string;
  city: string;
}
