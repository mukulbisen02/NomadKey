const express = require("express");
const router = express.Router();
const asyncWrep = require("../utilitys/asyncWrep.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

//SignUp
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(asyncWrep(userController.signUp));

//Login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

//Log Out
router.get("/logout", userController.logOut);

module.exports = router;
