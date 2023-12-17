"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME =  'products';

const ModelProduct = new Schema({
    name: {
        type: String,
        default: ''
    },
    price: {
        type: Schema.Types.Decimal128,
        default: 0
    },
    images: [
        {
            type: String,
            default: ''
        }
    ],
    quantity: {
        type: Number,
        default: 0
    },
    shortDes: {
        type: String,
        default: ''
    },
    longDes: {
        type: String,
        default: ''
    },
    ref: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
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
    collection: COLLECTION_NAME
})

// CREATE INDEX PRODUCT FOR SEARCH
ModelProduct.index({name: 'text', shortDes: 'text', longDes: 'text'});

module.exports = mongoose.model(COLLECTION_NAME, ModelProduct);