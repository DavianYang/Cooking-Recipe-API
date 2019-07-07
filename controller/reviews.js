const RecipesModel = require("../models/Recipes");
const UserModel = require("../models/User");
const reviewModel = require("../models/Review");
const recipesModel = new RecipesModel();
const userModel = new UserModel();
const model = new reviewModel();

// Error Handling
const {
  serverError,
  badRequest,
  notFound,
  notAuthorized
} = require("../utilites/httpError");

class reviewController {
  async getAllReviews(req, res) {
    try {
      const reviews = await model.getAllReviews();

      return res.status(200).send(reviews);
    } catch (err) {
      serverError(res, err);
    }
  }

  async addReview(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);
      const recipe = await recipesModel.getRecipeByID(req.params.recipe_id);

      const { text, stars } = req.body;

      if (!recipe) {
        return notFound(res, "Recipe does not exist");
      }

      if (user) {
        const review_id = await model.addReview(
          req.user.id,
          req.params.recipe_id,
          text,
          stars
        );

        return res.status(200).json(review_id);
      }

      return notAuthorized(res, "User not authorized");
    } catch (err) {
      serverError(err);
    }
  }

  async removeReview(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);
      const recipe = await recipesModel.getRecipeByID(req.params.recipe_id);

      const reviews = await model.getAllReviews();

      const doReview = reviews.find(review => review.id === req.params.id);

      if (!doReview) {
        return notFound(res, "Comment does not exit");
      } else {
        if (!recipe) {
          return notFound(res, "Recipe does not exist");
        }

        if (user) {
          const data = await model.removeReview(req.params.id);

          return res.status(200).json(data);
        }

        return notAuthorized(res, "User not authorized");
      }
    } catch (err) {
      serverError(res, err);
    }
  }
}

module.exports = reviewController;
