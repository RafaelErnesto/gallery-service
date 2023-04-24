import { DynamicModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServerFactory } from './mongo-memory-server.factory';

export const getMongooseModule = (
  options: MongooseModuleOptions = {},
): DynamicModule => {
  return MongooseModule.forRootAsync({
    useFactory: async () => {
      return await mongoServer[process.env.NODE_ENV](options);
    },
  });
};

export const closeInMongodConnection = MongoMemoryServerFactory.closeInMongodConnection()

const mongoServer = {
  test: MongoMemoryServerFactory.create(),
  development: async (options: MongooseModuleOptions = {}) => {
    return {
      uri: process.env.MONGO_URL,
      ...options,
    };
  },
  prod: async (options: MongooseModuleOptions = {}) => {
    return {
      uri: process.env.MONGO_URL,
      ...options,
    };
  },
};
