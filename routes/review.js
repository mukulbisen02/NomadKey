const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utilitys/asyncWrep.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Post Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview),
);

//Delete Review Route
router.delete(
  "/:reviewId", 
  isLoggedIn,
  isReviewAuthor,
  asyncWrap(reviewController.destroyReview),
);

module.exports = router;
