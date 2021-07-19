const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
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
}, {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
});

const Admin = mongoose.model("Admin", AdminSchema, "admins");

module.exports = Admin;