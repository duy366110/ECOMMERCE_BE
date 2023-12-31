'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configDb = require("../configs/config.db");

const ModelFeatured = new Schema({
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
    titleColor: {
        type: String,
        default: ""
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}, {
    collection: configDb.collection.featured
})

module.exports = mongoose.model(configDb.collection.featured, ModelFeatured);