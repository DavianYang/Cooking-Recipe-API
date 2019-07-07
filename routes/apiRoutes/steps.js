const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Controller
const recipesController = require("../../controller/recipes");
const controller = new recipesController();

// @route   GET api/steps
// @desc    Get All Step
// @access  Public
router.get("/", async (req, res) => controller.getAllSteps(req, res));

module.exports = router;
