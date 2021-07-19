const crypto = require("crypto");
const secret = "secretkey";

function hash(password) {
    return crypto.createHmac("sha512", secret).update(password).digest("hex");
}

module.exports = { hash }