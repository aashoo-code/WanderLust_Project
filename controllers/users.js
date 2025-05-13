const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to the app!");
            res.redirect("/listings");
        });
    } catch (e) {
        console.log(e);
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login =  async (req, res) => {
        req.flash("success", "Logged in successfully!");
        res.redirect(res.locals.returnTo || "/listings");
    }

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        } else {
            req.flash("success", "Logged out successfully!");
            res.redirect("/listings");
        }
    }
)}