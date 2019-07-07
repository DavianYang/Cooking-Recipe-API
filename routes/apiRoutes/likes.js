const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Controller
const likeController = require("../../controller/likes");
const controller = new likeController();

// @route   GET api/likes
// @desc    Get All Likes
// @access  Test Route
router.get("/", async (req, res) => controller.getAllLike(req, res));

// @route   GET api/likes/popularity
// @desc    Get Like By Recipes ID
// @access  Public
router.get("/popularity", async (req, res) =>
  controller.getLikeGroupByRecipesID(req, res)
);

// @route   POST api/likes/:recipe_id
// @desc    Like Recipes
// @access  Private
router.post("/:recipe_id", auth, async (req, res) =>
  controller.addLike(req, res)
);

// @route   POST api/likes/:recipe_id/:id
// @desc    UnLike Recipes
// @access  Private
router.post("/:recipe_id/:id", auth, async (req, res) =>
  controller.removeLike(req, res)
);

module.exports = router;
