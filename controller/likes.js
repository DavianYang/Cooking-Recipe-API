const RecipesModel = require("../models/Recipes");
const UserModel = require("../models/User");
const likeModel = require("../models/Like");
const recipesModel = new RecipesModel();
const userModel = new UserModel();
const model = new likeModel();

// Error Handling
const {
  serverError,
  badRequest,
  notAuthorized,
  notFound
} = require("../utilites/httpError");

class likeController {
  async getAllLike(req, res) {
    try {
      const likes = await model.getAllLike();

      res.status(200).send(likes);
    } catch (err) {
      serverError(res, err);
    }
  }

  async getLikeGroupByRecipesID(req, res) {
    try {
      const likes = await model.getLikeGroupByRecipesID();

      res.status(200).send(likes);
    } catch (err) {
      serverError(res, err);
    }
  }

  async addLike(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);
      const recipe = await recipesModel.getRecipeByID(req.params.recipe_id);

      const isLiked = await model.isLike(user.id, recipe.id);

      if (isLiked.length > 0) {
        return badRequest(res, "Recipe already liked");
      } else {
        if (!recipe) {
          return notFound(res, "Recipe does not exist");
        }

        if (user) {
          const like_id = await model.addLike(user.id, recipe.id);

          return res.status(200).json(like_id);
        }

        return notAuthorized(res, "User not Authorized");
      }
    } catch (err) {
      serverError(res, err);
    }
  }

  async removeLike(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);
      const recipe = await recipesModel.getRecipeByID(req.params.recipe_id);

      const isLiked = await model.isLike(user.id, recipe.id);

      if (isLiked.length === 0) {
        return badRequest(res, "Recipe hasn't yet been liked");
      } else {
        if (!recipe) {
          return notFound(res, "Recipe does not exist");
        }

        if (user) {
          const data = await model.removeLike(req.params.id);

          return res.status(200).json(data);
        }
      }
    } catch (err) {
      serverError(res, err);
    }
  }
}

module.exports = likeController;
