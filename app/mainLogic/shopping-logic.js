const Cart = require('../models/cart');
const CartDetail = require('../models/cart-detail');
var ObjectId = require('mongoose').Types.ObjectId;

// To carete cart
function createCart(cart) {
    return cart.save();
}

// To add product.
function addProduct(product) {
    return product.save();
}

// if product existing in cart via productId
function checkIfProductExistsInCart(product) {
    return CartDetail.findOne({ cartId: product.cartId, productId: product.productId });
}

// To check if userCart already exists.
function checkIfUserExistsInCart(userID) {
    return Cart.findOne({ userId: userID });
}

// Quamt +
function increaseQuant(data){
    return CartDetail.updateOne({
        cartId: ObjectId(data.cartId),
        'products.productId' : ObjectId(data.productId)
    },
    {
        $set: {
            'products.$.price': data.price,
            'products.$.quantity' : data.quantity
        }
    })
}

// To get Total of all products
function totalSum(data){
    return CartDetail.findOne({
        cartId: ObjectId(data.cartId),
    });
}

// To check product Exist in cart
function checkIfProductExists(productId){
    return CartDetail.findOne({
        products: {
            $elemMatch: {
                productId: productId,
            },
        }
    })
}

// for Once cart Creation in cartDetails.
function checkIfCartExists(cartID) {
    return CartDetail.findOne({ cartId: cartID });
}

// function updateProduct(product) {
//     return new Promise((resolve, reject) => {
//         CartDetail.updateOne({ _id: product._id }, product, (err, info) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(info.n ? product : null);
//         });
//     });
// }

// To add product in cart.
function addProductToCart(body) {
    return new Promise((resolve, reject) => {
        CartDetail.findOneAndUpdate({ cartId: body.cartId }, { $push: { products: body.products } }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info);
        });
    });
}

// To get all products existing in cart.
function getAllProductsOfCart(cartId) {
    return CartDetail.find({ cartId: cartId }).exec();
}

// To remove specific product.
function deleteProductFromCart(data) {
    console.log('857765654: ', data);
    new Promise((resolve, reject) => {
        // console.log("Hi");
        CartDetail.findOneAndUpdate({ cartId: data.cartId }, 
            { $pull: { products: { _id: data.productId } } })
          .exec((err, data) => {
            if (err) {
              return reject(err);
            } else {
              resolve(data);
            //   console.log("8768>>>>>>: ", data);
            }
          });
      });    
}

function decreaseProduct(data) {
    // console.log('857765654: ', data);
    new Promise((resolve, reject) => {
        // console.log("Hi");
        CartDetail.findOneAndUpdate({ cartId: data.cartId }, 
            { $pull: { products: { productId: data.productId } } })
          .exec((err, data) => {
            if (err) {
              return reject(err);
            } else {
              resolve(data);
            //   console.log("8768>>>>>>: ", data);
            }
          });
      });    
}
// To remove all products of cart.
function clearCart(cartId) {
    // console.log("logic: ", cartId);
    return CartDetail.deleteMany({cartId : cartId});
}



module.exports = {
    createCart,
    addProduct,
    checkIfProductExistsInCart,
    checkIfUserExistsInCart,
    addProductToCart,
    checkIfCartExists,
    // updateProduct,
    getAllProductsOfCart,
    deleteProductFromCart,
    clearCart,
    checkIfProductExists,
    increaseQuant,
    decreaseProduct
    
}