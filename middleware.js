module.exports.isLoggedIn = (req, res, next)=> {
    if (req.isAuthenticated())
        return next();

    req.flash("error", "You need to Log-In first!")
    return res.redirect("/login");
}

module.exports.isSeller = (req, res, next) => {
    console.log(req.session.role);
    if (req.isAuthenticated())
        return next();

    req.flash("error", "you are not a seller!");
    return res.redirect("/login");
}