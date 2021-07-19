const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const orderLogic = require('../mainLogic/order-logic');
const path = './uploads/receipts/';
const uuid = require('uuid');
const { request, response } = require('express');

router.post('/place-order', async (request, response) => {
    try {
        console.log("order you request to order: ", request.body);
        let data = request.body;
        // data.product = request.body.product;
        const product = new Order(data);
        const orderedProduct = await orderLogic.addOrder(product);
        console.log('ordered product: ', orderedProduct);
        response.json({ orderd: orderedProduct });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/get-all-orders', async (request, response) => {
    try {
        const orders = await orderLogic.getAllOrders();
        response.json(orders);
    } catch (error) {
        response.status(500).send(error.message);
    }
});


module.exports = router;