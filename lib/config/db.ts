import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { config } from 'dotenv';
import isEmpty from 'lodash/isEmpty';

import { logger } from '&utils/logger';

config();

const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD,
} = process.env;

let client: Db;

export const getMongoUrl = () => {
  const url = `mongodb://${MONGODB_USER}:${MONGODB_PWD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
  return url;
};

export const connect = async () => {
  if (!isEmpty(client)) return;
  try {
    const mongoUrl = getMongoUrl();
    const db = await MongoClient.connect(mongoUrl);
    client = db.db(MONGODB_DATABASE);
  } catch (err) {
    logger.info(err.message);
  }
};

export const collection = (name: string) => {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  } else if (
    !isEmpty(client) &&
    !(client.serverConfig.connections().length <= 0)
  ) {
    logger.error('MongoDB connection interrupted');
    throw new Error('MongoDB connection interrupted');
  }
  return client.collection(name);
};

export const getClient = () => {
  return client;
};

(async () => {
  await connect();
})();
