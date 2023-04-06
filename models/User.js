const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Product = require("./Product");

const userSchema = new mongoose.Schema({
    email: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    role: {
        type: String
    }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;
