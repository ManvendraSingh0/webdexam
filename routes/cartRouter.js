const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware");
const User = require('../models/User');
const Product = require('../models/Product');

router.get('/cart',isLoggedIn, async(req, res) => {
    const user = await User.findById(req.user._id).populate('cart');
    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    const productInfo = user.cart.map((p) => p.desc).join(',');
    res.render('cart/cart', { user, totalAmount, productInfo});
});

router.post('/products/:productID/add',isLoggedIn, async(req, res) => {
    const { productID } = req.params;
    const userid = req.user._id;
    const product = await Product.findById(productID);
    const gotUser = await User.findById(userid);

    gotUser.cart.push(product);
    await gotUser.save();

    res.redirect('/user/cart');
});

module.exports = router;
