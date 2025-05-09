import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config.js";
import { ConnectionOptions } from "mysql2";

mongoose.connect(config.DB.URI)

const connection = mongoose.connection;

connection.once('open', () => { 
  console.log("MongoDB database connection established successfully");
});    

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
    process.exit(0);
});

