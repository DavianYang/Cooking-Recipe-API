const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Controller
const reviewController = require("../../controller/reviews");
const controller = new reviewController();

// @route   GET api/reviews
// @desc    Like Recipes
// @access  Public
router.get("/", async (req, res) => controller.getAllReviews(req, res));

// @route   POST api/reviews/:recipe_id
// @desc    Post Review
// @access  Private
router.post(
  "/:recipe_id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty(),
      check("stars", "Star is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => controller.addReview(req, res)
);

// @route   POST api/likes/:recipe_id/:id
// @desc    UnLike Recipes
// @access  Private
router.post("/:recipe_id/:id", auth, async (req, res) =>
  controller.removeReview(req, res)
);

module.exports = router;
