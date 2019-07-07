const RecipesModel = require("../models/Recipes");
const UserModel = require("../models/User");
const cateogryModel = require("../models/Category");
const recipesModel = new RecipesModel();
const userModel = new UserModel();
const model = new cateogryModel();

// Error Handling
const {
  serverError,
  badRequest,
  notAuthorized,
  notFound
} = require("../utilites/httpError");

class categoryController {
  async getRecipesByCategory(req, res) {
    try {
      const recipes = await model.getRecipesByCategory(req.params.category_id);

      res.status(200).send(recipes);
    } catch (err) {
      serverError(res, err);
    }
  }
}

module.exports = categoryController;
