const express = require('express');
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(WrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        WrapAsync(listingController.createlisting)
    );

    // New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(WrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        WrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        isOwner,
        WrapAsync(listingController.deleteListing)
    );


// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    validateListing,
    WrapAsync(listingController.renderEditForm));

module.exports = router;    