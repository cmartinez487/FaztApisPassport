"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = __importDefault(require("./config/config.js"));
mongoose_1.default.connect(config_js_1.default.DB.URI, {
    authSource: "admin",
    user: config_js_1.default.DB.USER,
    pass: config_js_1.default.DB.PASSWORD,
});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(0);
});
