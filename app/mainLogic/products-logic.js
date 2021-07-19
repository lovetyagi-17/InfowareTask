const Product = require('../models/product');

// function updateProduct(productId,updateData) {
//     return new Promise((resolve, reject) => {
//         Product.updateOne({_id : productId }, updateData, {new:true},(err,info)=> {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(info.n ? updateData : null);
//         });
//     });
// }

function addProduct(product) {
    return product.save();
}

function addDoc(document) {
    return document.save();
}


function getAllProducts() {
    return Product.find({}).populate("categories").exec();
}

function getOneProduct(_id) {
    return Product.findOne({ _id });
}

function productDetails(_id) {
    return Product.find({ _id });
}


// function searchProduct(name) {
//     return Product.find({ name: new RegExp(name)}).exec();
// } 

function deleteProduct(_id) {
    return Product.deleteOne({ _id });
}

module.exports = {
    addDoc,
    getAllProducts,
    // searchProduct,
    // updateProduct,
    getOneProduct,
    addProduct,
    deleteProduct,
    productDetails

}