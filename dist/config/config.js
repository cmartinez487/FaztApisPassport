"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || "secretToken",
    DB: {
        URI: process.env.DB_URI || "mongodb://localhost:27017/new_db",
        USER: process.env.DB_USER || "admin",
        PASSWORD: process.env.DB_PASSWORD || "password123",
    }
};
