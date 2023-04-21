import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModuleOptions } from '@nestjs/mongoose';

let mongod: MongoMemoryServer = undefined

export class MongoMemoryServerFactory {

    static create() {
        return async (options: MongooseModuleOptions = {}) => {
            let mongod = await MongoMemoryServer.create();
            const mongoUri = mongod.getUri();
            return {
                uri: mongoUri,
                ...options,
            };
        }
    }
    static closeInMongodConnection() {
        return async () => { if (mongod) await mongod.stop(); }
    };
}

