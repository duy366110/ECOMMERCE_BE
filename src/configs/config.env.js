"use strict"
require('dotenv').config();
const Environment = require("../environment");

const Config = {
    DEV: {
        DB_URL: process.env.MONGODB_DEV_URL,
        CORS: Environment.CORS.ORIGINS_DEV,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        CLOUDINARY_DIRECTORY: process.env.DIRECTORY_DEV || 'test_ecommerce',
        PERMISSION: Environment.PERMISSION.DEV
    },
    PRO: {
        DB_URL:process.env.MONGODB_PRO_URL,
        CORS: Environment.CORS.ORIGINS_PRO,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
        CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
        CLOUDINARY_DIRECTORY: process.env.DIRECTORY_PRO || 'ecommerce',
        PERMISSION: Environment.PERMISSION.PRO
    }
}

const configInstance = Config[process.env.MODEL];

module.exports = configInstance;