import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";

import "../src/models/user.model.js";
import "../src/models/org.model.js";

let replset;

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret";

  replset = await MongoMemoryReplSet.create({
    replSet: {
      count: 1,
      storageEngine: "wiredTiger",
    },
  });

  const uri = replset.getUri();
  await mongoose.connect(uri);

  await mongoose.connection.syncIndexes();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await replset.stop();
});