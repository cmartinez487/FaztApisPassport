import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config.js";

mongoose.connect(config.DB.URI, {
    authSource: "admin",
    user: config.DB.USER,
    pass: config.DB.PASSWORD,
});

const connection = mongoose.connection;

connection.once('open', () => { 
  console.log("MongoDB database connection established successfully");
});    

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
    process.exit(0);
});

