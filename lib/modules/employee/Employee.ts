import BaseEntity from '&utils/BaseEntity';

export default interface Employee extends BaseEntity {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phone: string;
  salary: number;
  annualLeaves: number;
}
