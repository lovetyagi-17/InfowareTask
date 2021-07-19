const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    phone: {
        type: Number,
        required: true,
        minlength: 8,
        
    },
    address: {
        type: String,
        required: true,
        minlength: 1
    },
    city: {
        type: String,
        required: true,
        minlength: 1
    },
    state: {
        type: String,
        required: true,
        minlength: 1
    },
    country: {
        type: String,
        required: true,
        minlength: 1
    },
    zip: {
        type: Number,
        required: true,
        minlength: 5
    },    
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
