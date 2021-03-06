import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { config } from 'dotenv';
import isEmpty from 'lodash/isEmpty';

import { Logger } from '&utils/logger';
import BaseEntity from '&utils/BaseEntity';

config();

const {
  MONGODB_HOST,
  MONGODB_CONFIG,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD,
} = process.env;

let client: Db;

export const getMongoUrl = (): string => {
  const url = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}/${MONGODB_DATABASE}${
    MONGODB_CONFIG ?? ''
  }`;
  Logger.info(url);
  return url;
};

/**
 * Used to connect to MongoDB.
 * @returns a promise with the created database connection.
 */
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

/**
 * Get a MongoDB collection from the database.
 * @param name the collection name.
 * @returns a MongoDB collection.
 */
export const collection = (name: string): Collection => {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  }
  return client.collection(name);
};

/**
 * Add a new element to a specific collection.
 * @param name collection name
 * @param item item to be added
 * @returns
 */
export const insert = <T extends BaseEntity>(name: string, item: T): T => {
  item.created_on = new Date();
  item.updated_on = new Date();

  const _collection = collection(name);
  _collection.insertOne(item);
  return item;
};

/**
 * Remove an item by id from a specific collection
 * @param name collection name
 * @param id id of the item
 */
export const remove = (name: string, id: string) => {
  const _collection = collection(name);
  _collection.deleteOne({ _id: new ObjectId(id) });
};

/**
 * Update an item in a specific collection
 * @param name collection name
 * @param id id of the item
 * @param item json of the updated fields
 * @returns
 */
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
export interface PaginationAndSortingQueryParams {
  page: number;
  pageSize: string;
  sortBy: [string];
  filters: unknown;
}

/**
 * Check if an item matching any filter exists
 */
export const exists = async (name: string, filters): Promise<boolean> => {
  const _collection = collection(name);
  Logger.info(filters);

  const keys = Object.keys(filters);
  const query = [];
  keys.forEach((key) => {
    const t = {};
    t[key] = filters[key];
    query.push(t);
  });
  Logger.info(JSON.stringify(query));
  const cursor = _collection.find({
    $or: query,
  });
  const count = await cursor.count();
  return count > 0;
};

/**
 * Gets all items that match any filter
 */
export const findOr = async <T>(name: string, filters): Promise<[T]> => {
  const _collection = collection(name);
  Logger.info(filters);

  const keys = Object.keys(filters);
  const query = [];
  keys.forEach((key) => {
    const t = {};
    t[key] = filters[key];
    query.push(t);
  });
  Logger.info(JSON.stringify(query));
  const cursor = _collection.find({
    $or: query,
  });
  const items = cursor.toArray() as Promise<[T]>;
  return items;
};
/**
 * Get all items of a collection.
 * @param name collection name
 * @param query Params for the query in case not all items are needed
 * @returns array of items.
 */
export const find = async <T>(
  name: string,
  { page, pageSize, sortBy, filters = {} }: PaginationAndSortingQueryParams,
): Promise<[T]> => {
  const _collection = collection(name);
  let cursor = _collection.find(filters);
  if (!isEmpty(sortBy)) {
    const sortOptions = {};
    // if only one sorting field is set, convert from string to array
    if (typeof sortBy === 'string') {
      sortBy = [sortBy];
    }
    // map each entry in the array to mongo filters syntax
    sortBy.forEach((element) => {
      sortOptions[element.split('.')[0]] = element.split('.')[1];
    });

    Logger.info(JSON.stringify(sortOptions));
    cursor = cursor.sort(sortOptions);
  }
  if (!isEmpty(page)) {
    const size: number = parseInt(pageSize ?? '10');
    Logger.info(`Skipping ${(page - 1) * size}`);
    Logger.info(`Size ${size}`);
    cursor = cursor.skip((page - 1) * size).limit(size as number);
  }

  const items = cursor.toArray() as Promise<[T]>;
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
