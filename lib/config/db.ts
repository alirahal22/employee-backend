import { Collection, Db, MongoClient } from 'mongodb';
import { config } from 'dotenv';
import isEmpty from 'lodash/isEmpty';
import { Logger } from '../utils/logger';

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
    const db = await MongoClient.connect(mongoUrl);
    return db.db(MONGODB_DATABASE);
  } catch (err) {
    Logger.info(err.message);
  }
};

export const collection = (name: string): Collection => {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  }
  return client.collection(name);
};

export const getClient = (): Db => {
  return client;
};

(async () => {
  Logger.info('Connecting to the database');
  client = await connect();
})();
