const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

const Document = mongoose.model("", DocumentSchema, "documents");

module.exports = Document; 
