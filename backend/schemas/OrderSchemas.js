const { Schema} = require("mongoose");

const OrderSchemas = new Schema({
    name:String,
    qty:Number,
    price:Number,
    mode:String,
})
module.exports = {OrderSchemas};