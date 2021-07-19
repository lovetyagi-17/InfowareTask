const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ProductSchema.virtual("cartDetail", {
    ref: "CartDetail",
    localField: "_id",
    foreignField: "productId"
});

// ProductSchema.virtual("category", {
//     ref: "Category",
//     localField: "categoryId",
//     foreignField: "_id",
//     justOne: true
// });
const Product = mongoose.model("Product", ProductSchema, "products");

module.exports = Product; 
