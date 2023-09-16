const mongoose = require("mongoose");

class mongodb {

    constructor() { }

    connect = (callback) => {
        mongoose.connect('mongodb+srv://duy366110:jvLAaEtOIsc8EBuM@normal.29rxu4p.mongodb.net/ecommerce?retryWrites=true&w=majority') // mongodb://127.0.0.1:27017/ass_03
        .then(() => {
            callback();
        })
        .catch((error) => {
            throw error;

        })
    }
}

module.exports = new mongodb();