const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const {isLoggedIn, isSeller} = require("../middleware")

// get all products
router.get("/products", async (req, res)=>{
    const products =  await Product.find({});
    res.render("./products/product" , {products})
});

// get forms to create a new product
router.get("/products/new", async (req, res)=>{
     res.render("./products/new")
});

//create a new product
router.post("/products", isLoggedIn, async (req, res) => {
    const {name , img , desc , price} = req.body;
    await Product.create({name , img , desc , price});

    req.flash("success" , "your product has been created successfully!")
    res.redirect("/products")
});

//show a single product
router.get("/products/:productID",  async (req,res)=>{
    const {productID} = req.params;
    const product = await Product.findById(productID).populate("review");
    res.render("./products/show", {product})
});

// get the edit form
router.get("/products/:productID/edit", isLoggedIn, isSeller, async(req, res)=>{
    const {productID} = req.params;
    const product = await Product.findById(productID);
    res.render("./products/edit" , {product})
});


//update a product
router.patch("/products/:productID", async (req, res)=>{
    const {name , img , price, desc } = req.body;
    const {productID} = req.params;
    await Product.findByIdAndUpdate(productID , { img , price , desc, name });

    req.flash("update", "your product has been updated");
    res.redirect("/products");
});

// delete a product
router.delete("/products/:productID", async(req, res)=>{
    const {productID} = req.params;
    await  Product.findByIdAndDelete(productID);

    res.redirect("/products");
});

module.exports = router;
