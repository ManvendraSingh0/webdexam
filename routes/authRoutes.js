const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport")

//get register page
router.get("/register", (req,res)=>{
    res.render("auth/signup")
});

//register new user
router.post("/register",async(req,res) => {
    const { username, password, email, role } = req.body;
    req.session.role = role;
    const user = new User({ username, email, role });
    const newUser = await User.register(user, password);

    req.flash("success", "You have Registered Successfully as " + role);
    res.redirect("/login");
});

//login user
router.get("/login",(req,res)=>{
    res.render("auth/login")
})

// Login user into the session
router.post("/login",
    passport.authenticate("local", {
     failureRedirect: "/login",
     failureFlash: "Login error, please try again!"
    }), async (req, res) => {
    const userid = req.user._id;
    const currUser = await User.findOne(userid);

    console.log(currUser.role);
    req.session.role = currUser.role;

    req.flash("success", `${req.user.username.toUpperCase()}, your login was successfull`)
    res.redirect("/products")
});

// logout user from session
router.get('/logout', function(req, res, next) {
    req.logout( (err) => {
        if (err)
            return next(err);

        req.flash('success', 'GoodBye, see you again!');
        res.redirect('/login');
    });
});

module.exports = router;