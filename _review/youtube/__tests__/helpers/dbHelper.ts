import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class DBHelper {
  private mongod: MongoMemoryServer;

  async connect(): Promise<void> {
    this.mongod = await MongoMemoryServer.create();
    const uri = this.mongod.getUri();
    await mongoose.connect(uri);
  }

  async disconnect(): Promise<void> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongod.stop();
  }

  async cleanup(): Promise<void> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
}

export const dbHelper = new DBHelper();