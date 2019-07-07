const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Controller
const categoryController = require("../../controller/category");
const controller = new categoryController();

// @route   GET api/category
// @desc    Like Recipes
// @access  Public
router.get("/:category_id", async (req, res) =>
  controller.getRecipesByCategory(req, res)
);

module.exports = router;
