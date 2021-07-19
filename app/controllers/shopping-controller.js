const express = require('express');
const router = express.Router();
const shoppingLogic = require('../mainLogic/shopping-logic');
const productsLogic = require('../mainLogic/products-logic');
const Cart = require('../models/cart');
const CartDetail = require('../models/cart-detail');
var ObjectId = require('mongoose').Types.ObjectId;

router.post('/create-cart', async (request, response) => {
    try {
        // console.log("worki", request.body.userId);
        const checkId = await shoppingLogic.checkIfUserExistsInCart(request.body.userId);
        if (checkId) {
            // console.log("checkId", checkId);
            return response.json({ message: 'Cart is already Existing', result: checkId });
        }
        var cart = new Cart(request.body);
        cart.date = new Date();
        cart.userId = request.body.userId;
        let myCart = await shoppingLogic.createCart(cart);
        response.json(myCart);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.post('/decrease-product', async (request, response) => {
    try {
        let data = request.body;
        // console.log('data: ', data);
        let productData = await shoppingLogic.checkIfProductExists(data.productId);
        // console.log('productData: ', productData);
        let result = productData.products.filter((ele) => {
            if (ele.productId == data.productId) {
                return ele;
            }
        });
        // console.log('result: ', result);
        if (result[0].quantity == 1) {
            console.log('deleted this');
            let deletedItem = {
                cartId: ObjectId(data.cartId),
                productId: ObjectId(data.productId),
            }
            // console.log('jiudhvyfeyrrrrrrrrrrrrrrrrrrrrrrrrrrrr: ', deletedItem);
            let deleteProduct = await shoppingLogic.decreaseProduct(deletedItem);
            console.log('delete: ', deleteProduct);
            let resultData = await shoppingLogic.getAllProductsOfCart(data.cartId);
            return res.json({ code: 200, mesage: 'deleted successfully!', data: resultData});
        } else {
            console.log('decrease this');
            let productDetails = await productsLogic.getOneProduct(data.productId);
            let updateQuantity = result[0].quantity - 1;
            let updatedPrice = productDetails.price * updateQuantity;
            let dataUpdateFields = {
                cartId: ObjectId(data.cartId),
                price: updatedPrice,
                quantity: updateQuantity,
                productId: ObjectId(data.productId)
            };
            // console.log('fjhvurgvyfhgvgfhgvhtfgv: ', dataUpdateFields);
            let updatedProduct = await shoppingLogic.increaseQuant(dataUpdateFields);
            if (updatedProduct) {
                let resultData = await shoppingLogic.getAllProductsOfCart(data.cartId);
                return res.json({ code: 200, mesage: 'deleted successfully!', data: resultData});
            } else {
                return res.json({ code: 400, mesage: 'error!', data: resultData});
            }
        }
    } catch (error) {
        response.status(500).send(error);
    }
});


// router.post('/decrease-product', async (request, response) => {
//     try {
//         let data = request.body;
//         // console.log("data: ", request.body);
//         const userData = await shoppingLogic.checkIfUserExistsInCart(request.body.userId);
//         if(userData){
//             let cartData = await shoppingLogic.checkIfCartExists(userData._id);
//             console.log("cartData------------------------------: ", cartData);
//             if(cartData){
//                 let productData = await shoppingLogic.checkIfProductExists(data.productId);
//                 if(productData){
//                     // console.log('product exists!!!');
//                     let productDetails =  await productsLogic.getOneProduct(data.productId);
//                     // console.log('dgfgtgrd00000: ', productDetails);
//                     // console.log('00000: ', productData);
//                     let result = productData.products.filter((ele) => {
//                         if(ele.productId == data.productId){
//                             return ele;
//                         }
//                     });
//                     // console.log('=======>>>>: ', result);
//                         let updateQuantity = result[0].quantity - 1;
//                         let updatedPrice = productDetails.price * updateQuantity;
//                         // console.log('result[0]: ', result[0]);
//                         if(result[0].quantity <= 1){
//                             let deletedItem = {
//                                 cartId: ObjectId(cartData.cartId),
//                                 productId: ObjectId(data.productId),
//                             }
//                             // console.log('jiudhvyfeyrrrrrrrrrrrrrrrrrrrrrrrrrrrr: ', deletedItem);
//                             let deleteProduct = await shoppingLogic.decreaseProduct(deletedItem);
//                             return res.json({code: 200, mesage: 'deleted successfully!', data: deleteProduct});
//                         }
//                     // console.log(updateQuantity, ' :cartUpdated: ', updatedPrice);
//                     let dataUpdateFields = {
//                         cartId: ObjectId(cartData.cartId),
//                         price: updatedPrice,
//                         quantity: updateQuantity,
//                         productId: ObjectId(data.productId)
//                     };
//                     // console.log('fjhvurgvyfhgvgfhgvhtfgv: ', dataUpdateFields);
//                     let updatedProduct = await shoppingLogic.increaseQuant(dataUpdateFields);
//                     if(updatedProduct){
//                         // console.log('sucessfully updated ++', updatedProduct);
//                         return response.json('updated successfully!')
//                     } else{
//                         console.log('not updated!!!');
//                     }
//                 }
//             }

//         }
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

router.post('/add-product', async (request, response) => {
    try {
        let data = request.body;
        // console.log("data: ", request.body);
        const userData = await shoppingLogic.checkIfUserExistsInCart(request.body.userId);
        if (userData) {
            let cartData = await shoppingLogic.checkIfCartExists(userData._id);
            // console.log("cartData: ", cartData);
            if (cartData) {
                let productData = await shoppingLogic.checkIfProductExists(data.productId);
                if (productData) {
                    // console.log('product exists!!!');
                    let productDetails = await productsLogic.getOneProduct(data.productId);
                    // console.log('dgfgtgrd00000: ', productDetails);
                    // console.log('00000: ', productData);
                    let result = productData.products.filter((ele) => {
                        if (ele.productId == data.productId) {
                            return ele;
                        }
                    });
                    // console.log('=======>>>>: ', result);
                    let updateQuantity = result[0].quantity + 1;
                    let updatedPrice = productDetails.price * updateQuantity;
                    // console.log(updateQuantity, ' :cartUpdated: ', updatedPrice);
                    let dataUpdateFields = {
                        cartId: ObjectId(cartData.cartId),
                        price: updatedPrice,
                        quantity: updateQuantity,
                        productId: ObjectId(data.productId)
                    };
                    console.log('fjhvurgvyfhgvgfhgvhtfgv: ', dataUpdateFields);
                    let updatedProduct = await shoppingLogic.increaseQuant(dataUpdateFields);
                    if (updatedProduct) {
                        // console.log('sucessfully updated ++', updatedProduct);
                        return response.json('updated successfully!')
                    } else {
                        console.log('not updated!!!');
                    }
                } else {
                    // console.log('Product ++++++');
                    data.cartId = userData._id;
                    // console.log("hima------->>>>: ", data);
                    let productArray = {
                        cartId: ObjectId(userData._id),
                        products: {
                            productId: ObjectId(data.productId),
                            quantity: data.quantity,
                            price: data.price,
                            name: data.name,
                            image: data.image
                        }
                    }
                    // console.log("Araay: ", productArray);
                    let result = await shoppingLogic.addProductToCart(productArray);
                    return response.json(result);
                }
            }
            var cartDetails = new CartDetail();
            cartDetails.cartId = userData._id;
            cartDetails.products = data
            cartDetails.save((err, result) => {
                // console.log("else:  ", result);
                return response.json(result);
            });
        }
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/get-all-products/:cartId', async (request, response) => {
    try {
        let cartId = request.params.cartId;
        let products = await shoppingLogic.getAllProductsOfCart(cartId);
        return response.json({ status: "Success", code: 200, data: products });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/clear-cart/:id', async (request, response) => {
    try {
        // console.log("Cart Cler Successfully: ", request.params.id);
        let cartId = request.params.id;
        let remainedData = await shoppingLogic.clearCart(cartId);
        response.json(remainedData);
    } catch (error) {
        response.status(500).send(error.message);
    }
});


router.post('/remove-product', async (request, response) => {
    try {
        console.log("deleted 1 product Successfully: ", request.body);
        let data = request.body;
        // console.log("data: ", data);
        let result = await shoppingLogic.deleteProductFromCart(data);
        response.status(204).json(result);
    } catch (error) {
        response.status(500).send(error);
    }
});



module.exports = router;