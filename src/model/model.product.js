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
    }

}, {
    collection: COLLECTION_NAME
})

module.exports = mongoose.model(COLLECTION_NAME, ModelProduct);