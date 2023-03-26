import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongod: MongoMemoryServer;

export const getMongooseModule = (
  options: MongooseModuleOptions = {},
): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      return await mongoServer[process.env.ENV](options);
    },
  });
};

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};

const mongoServer = {
  TEST: async (options: MongooseModuleOptions = {}) => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    return {
      uri: mongoUri,
      ...options,
    };
  },
  LOCAL: async (options: MongooseModuleOptions = {}) => {
    return {
      uri: 'mongodb://local-db:27017/local',
      ...options,
    };
  },
  PROD: async (options: MongooseModuleOptions = {}) => {
    return {
      uri: 'mongodb://local-db:27017/local',
      ...options,
    };
  },
};
