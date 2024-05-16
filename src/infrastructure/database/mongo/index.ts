import mongoose, { Connection } from "mongoose";
import config from "../../../config";

export class DB {
  connection?: Connection;

  async connect() {
    await mongoose.connect(config.getMongoURL(), {
      maxPoolSize: 10,
    });
    this.connection = mongoose.connection;
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

export default new DB();
