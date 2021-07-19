const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 40
        },
        image: {
            type: String,
        }
    }]
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

OrderSchema.virtual("Order", {
    ref: "User",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});


const Order = mongoose.model("Order", OrderSchema, "orders");

module.exports = Order;
