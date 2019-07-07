const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Controller
const recipesController = require("../../controller/recipes");
const controller = new recipesController();

// Error Handling
const { validationError } = require("../../utilites/httpError");

// @route   GET api/recipes
// @desc    Get All Recipes
// @access  Public
router.get("/", async (req, res) => controller.getAllRecipe(req, res));

// @route   GET api/recipes/latest
// @desc    Get All Recipes By Date
// @access  Public
router.get("/latest", async (req, res) =>
  controller.getRecipeByLatest(req, res)
);

// @route   GET api/recipes/:id
// @desc    Get Recipes By ID
// @access  Public
router.get("/:id", async (req, res) => controller.getRecipeByID(req, res));

// @route   POST api/recipes
// @desc    Create Recipe
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("category_id", "Category is required")
        .not()
        .isEmpty(),
      check("estimated_time", "Estimated time is required")
        .not()
        .isEmpty(),
      check("ingredients", "Ingredients")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors);
    }

    controller.postRecipe(req, res);
  }
);

// @route   POST api/recipes/delete/:id
// @desc    Delete Recipe
// @access  Private
// @error   True
router.post("/delete/:id", auth, async (req, res) =>
  controller.deleteRecipe(req, res)
);

module.exports = router;
