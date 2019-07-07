const express = require("express");
const router = express.Router();

const authRoute = require("./apiRoutes/auth");
const recipesRoute = require("./apiRoutes/recipes");
const likeRoute = require("./apiRoutes/likes");
const reviewRoute = require("./apiRoutes/reviews");
const categoryRoute = require("./apiRoutes/category");
// Test Route
const stepRoute = require("./apiRoutes/steps");
// const imageRoute = require("./apiRoutes/images");

// Define Route
router.use("/users", authRoute);
router.use("/recipes", recipesRoute);
router.use("/likes", likeRoute);
router.use("/reviews", reviewRoute);
router.use("/category", categoryRoute);
router.use("/steps", stepRoute);
// router.use("/images", imageRoute);

module.exports = router;
