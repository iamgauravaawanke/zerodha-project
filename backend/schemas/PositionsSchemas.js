const {Schema} = require("mongoose");

const PositionsSchemas = new Schema ({
    product: String,
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
    isLoss: Boolean,
    
})

module.exports = {PositionsSchemas};
