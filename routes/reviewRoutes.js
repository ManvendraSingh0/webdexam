const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product")

router.post("/products/:productID/review", async (req, res) => {
    const { productID } = req.params;
    const { rating , comment } = req.body;

    const product = await Product.findById(productID);
    let review = await Review.create({rating , comment});
    product.review.push(review);

    await product.save();
    res.redirect(`/products/${productid}`);
});

module.exports= router