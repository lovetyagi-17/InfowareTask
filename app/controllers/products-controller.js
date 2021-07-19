const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productsLogic = require('../mainLogic/products-logic');
const fs = require('fs');
const uuid = require('uuid');


router.post('/add-product', async (request, response) => {
    try {
        if (!request.files) {
            throw "You need to upload image !"
        }
         //upload image 
        const file = request.files.image;
        const randomName = uuid.v4();
        const extension = file.name.substr(file.name.lastIndexOf('.'));
        file.mv('./uploads/' + randomName + extension);

        let productData = JSON.parse(request.body.product)
        console.log("productData: ", productData);
        const product = new Product(productData);
        product.image  = randomName + extension; 
        const addedProduct = await productsLogic.addProduct(product);
        response.json({product : addedProduct});
    } catch (error) {
        response.status(500).send(error.message);
    }
});


router.get('/get-all-products', async (request, response) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/get-one-product/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        // console.log("hi", _id);
        const products = await productsLogic.getOneProduct(_id);
        // console.log('prodcuts: ', products);
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/get-product-details/:_id', async (request, response) => {
    try {
        const _id = request.params._id;
        // console.log("hi", _id);
        const products = await productsLogic.productDetails(_id);
        // console.log('prodcuts: ', products);
        response.json(products);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/image/:name', async (request, response) => {
    try {
        const name = request.params.name;
        fs.readFile('./uploads/' + name,(err,data)=> {
            if(err){
                throw err;
            }
            response.end(data);
        });
    } catch (error) {
        response.status(500).send(error);
    }
});

// router.delete('/remove-product/:_id', async (request, response) => {
//     try {
//         const _id = request.params._id;
//         await productsLogic.deleteProduct(_id);
//         response.status(204).json({message: "Product Deleted Successfully"});
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

module.exports = router;