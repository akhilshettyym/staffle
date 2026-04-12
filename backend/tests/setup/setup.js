import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

let replset;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";

  replset = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
  });

  await mongoose.connect(replset.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await replset.stop();
});