const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Controller
const UserController = require("../../controller/user");
const controller = new UserController();

// Middleware
const auth = require("../../middleware/auth");

// Error Handling
const { validationError } = require("../../utilites/httpError");

// @route   GET api/users
// @desc    Test route
// @access  Priavte
router.get("/", auth, (req, res) => controller.getAll(req, res));

// @route   GET api/users/:id
// @desc    Test route
// @access  Priavte
router.get("/:id", auth, (req, res) => controller.findUserByID(req, res));

// @route   POST api/users/register
// @desc    Register
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    controller.register(req, res);
  }
);

// @route   POST api/users/signIn
// @desc    Authenticate User & Get Token
// @access  Public
router.post(
  "/signIn",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    controller.signIn(req, res);
  }
);

module.exports = router;
