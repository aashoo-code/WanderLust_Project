const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const WrapAsync = require('../utils/WrapAsync.js');
const passport = require('passport');
const { saveReturnTo } = require('../middleware.js');
const userController = require('../controllers/users.js');
const { route } = require('./user.js');


router.route("/signup")
    .get(userController.renderSignup)
    .post(
        WrapAsync(userController.signup)
    );

    router.route("/login")
    .get(userController.renderLogin)
    .post(
        saveReturnTo,
        passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),
        WrapAsync(userController.login)
    );


router.get("/logout", userController.logout);

module.exports = router;