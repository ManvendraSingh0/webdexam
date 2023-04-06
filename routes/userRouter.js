const express = require("express");
const {isLoggedIn} = require("../middleware");
const router = express.Router();
const User = require("../models/User");


router.get('/user/cart', isLoggedIn, async (req, res) => {
    const userid = req.user._id
    const user = await User.find(userid);
    res.redirect('/cart');
});

module.exports = router;