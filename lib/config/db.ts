import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { config } from 'dotenv';
import isEmpty from 'lodash/isEmpty';

import { Logger } from '&utils/logger';
import BaseEntity from '&utils/BaseEntity';

config();

const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD,
} = process.env;

let client: Db;

export const getMongoUrl = (): string => {
  const url = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
  return url;
};

export const connect = async (): Promise<Db> => {
  if (!isEmpty(client)) return;
  try {
    const mongoUrl = getMongoUrl();
    const mongoClient = await MongoClient.connect(mongoUrl);
    return mongoClient.db(MONGODB_DATABASE);
  } catch (err) {
    Logger.error(err.message);
    throw new Error('Could not connect to MongoDB');
  }
};

export const collection = (name: string): Collection => {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  }
  return client.collection(name);
};

export const insert = <T extends BaseEntity>(name: string, item: T): T => {
  item.created_on = new Date();
  item.updated_on = new Date();

  const _collection = collection(name);
  _collection.insertOne(item);
  return item;
};

export const update = <T extends BaseEntity>(
  name: string,
  id: string,
  item: T,
): T => {
  item.updated_on = new Date();

  const _collection = collection(name);
  _collection.updateOne({ _id: new ObjectId(id) }, { $set: item });
  return item;
};

export const find = async <T>(name: string): Promise<[T]> => {
  const _collection = collection(name);
  const items = _collection.find({}).toArray() as Promise<[T]>;
  return items;
};

export const findById = async <T>(name: string, id: string): Promise<T> => {
  const _collection = collection(name);
  const item = _collection.findOne({
    _id: new ObjectId(id),
  }) as Promise<T>;
  return item;
};

export const getClient = (): Db => {
  return client;
};

(async () => {
  Logger.info('Connecting to the database');
  client = await connect();
})();
