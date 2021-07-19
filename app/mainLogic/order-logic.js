const Order = require('../models/order');
const fs = require("fs");
const shoppingLogic = require('./shopping-logic');
const { request } = require('express');


function addOrder(data) {
    return data.save();
};


function getAllOrders() {
    return Order.find({}).exec();
}



module.exports = {
    addOrder,
    getAllOrders,
}