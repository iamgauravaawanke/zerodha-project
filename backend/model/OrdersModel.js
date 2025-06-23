const {model } = require("mongoose");
const { OrderSchemas } = require("../schemas/OrderSchemas");


const OrdersModel = new model("order" , OrderSchemas);

module.exports = {OrdersModel};