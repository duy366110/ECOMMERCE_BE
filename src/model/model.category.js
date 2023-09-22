'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'categories';

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
            ref: 'products'
        }
    ]
}, {
    collection: COLLECTION_NAME
})

module.exports = mongoose.model(COLLECTION_NAME, ModelCategory);