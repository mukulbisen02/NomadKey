const express = require("express");
const router = express.Router();
const asyncWrap = require("../utilitys/asyncWrep.js");
const {
  exitListing,
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

//Index Route + Create Route
router
  .route("/")
  .get(asyncWrap(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(listingController.createListing),
  );

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route + Update Route + Delete Route
router
  .route("/:id")
  .get(exitListing, asyncWrap(listingController.showListing))
  .put(
    isLoggedIn,
    exitListing,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(listingController.updateListing),
  )
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListing));

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  exitListing,
  isOwner,
  asyncWrap(listingController.renderEditFrom),
);

module.exports = router;
