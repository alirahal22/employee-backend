import { ObjectId } from 'mongodb';

export default interface BaseEntity {
  _id: ObjectId;
  created_on: Date;
  updated_on: Date;
}
