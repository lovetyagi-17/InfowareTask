const User = require('../models/user');
const Admin = require('../models/admin');
const cryptography = require('../helpers/cryptography');

// Update Password
function updatePassword(updateData) {
    updateData.password = cryptography.hash(updateData.password);
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate( {_id: updateData.userId}, 
            {$set: {password: updateData.password}}, 
            {new:true},
            (err,info)=> {
            if (err) {
                reject(err);
                return;
            }
            resolve(info.n ? updateData : null);
        });
    });
}

/// ------- Register -------- //
function addUser(user) {
    user.password = cryptography.hash(user.password);
    return user.save();
}

function getAllUsers() {
    return User.find({}).exec();
}

function checkEmail(email) {
    return User.find({ email }).exec();
}

function checkId(id) {
    return User.find({ id }).exec();
}

/// ------- User-Login -------- //
function login(details) {
    details.password = cryptography.hash(details.password);
    return User.find({ email: details.email, password: details.password });
}

/// ------- Admin-Login -------- //
function adminLogin(details) {
    details.password = cryptography.hash(details.password);
    return Admin.find({ email: details.email, password: details.password });
}


module.exports = {
    addUser,
    checkEmail,
    updatePassword,
    checkId,
    login,
    adminLogin,
    getAllUsers,
}
