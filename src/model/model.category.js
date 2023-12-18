'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configDb = require("../configs/config.db");

const ModelCategory = new Schema({
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    images: [
        {
            type: String,
            default: ''
        }
    ],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    collections: [
        {
            type: Schema.Types.ObjectId,
            ref: configDb.collection.product
        }
    ]
}, {
    collection: configDb.collection.category
})

module.exports = mongoose.model(configDb.collection.category, ModelCategory);