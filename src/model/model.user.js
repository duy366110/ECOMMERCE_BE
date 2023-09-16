"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'users';

const ModelUser = new Schema({
    username: {
        type: String,
        default: '',
    },
    fullname: {
        type: String,
        default: '',
    }, 
    email: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: ''
    },
    phonenumber: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: ''
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roles'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    cart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ],
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: 'orders'
        }
    ]
}, {
    collection: COLLECTION_NAME
})

module.exports = mongoose.model(COLLECTION_NAME, ModelUser);