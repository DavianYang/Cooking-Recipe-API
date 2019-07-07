const recipesModel = require("../models/Recipes");
const UserModel = require("../models/User");
const StepModel = require("../models/Step");
const IngredientModel = require("../models/Ingredient");
const model = new recipesModel();
const userModel = new UserModel();
const stepModel = new StepModel();
const ingredientModel = new IngredientModel();
const {
  serverError,
  badRequest,
  notFound,
  notAuthorized
} = require("../utilites/httpError");

class recipesController {
  async getAllRecipe(req, res) {
    try {
      const recipes = await model.getAllRecipes();

      return res.status(200).send(recipes);
    } catch (err) {
      serverError(res, err);
    }
  }

  async getRecipeByID(req, res) {
    try {
      const recipe = await model.getRecipeByID(req.params.id);

      if (recipe) {
        return res.json(recipe);
      }

      return notFound(res, "Recipe Not Found");
    } catch (err) {
      serverError(res, err);
    }
  }

  async getRecipeByLatest(req, res) {
    try {
      const recipes = await model.getRecipeByLatest();

      console.log(recipes);

      return res.status(200).send(recipes);
    } catch (err) {
      serverError(res, err);
    }
  }

  async getAllSteps(req, res) {
    try {
      const steps = await stepModel.getAllStep();

      return res.status(200).send(steps);
    } catch (err) {
      serverError(res, err);
    }
  }

  async postRecipe(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);

      if (user) {
        const {
          name,
          category_id,
          ingredients,
          estimated_time,
          steps
        } = req.body;

        ingredients.forEach(ingredient => console.log(ingredient));

        steps.forEach(step => console.log(step));

        const recipe_id = await model.postRecipes(
          req.user.id,
          category_id,
          name,
          estimated_time
        );

        await ingredients.forEach(ingredient =>
          ingredientModel.insertIngredient(
            recipe_id,
            ingredient.number,
            ingredient.name
          )
        );

        await steps.forEach(item =>
          stepModel.insertStep(recipe_id, item.step, item.description)
        );

        return res.status(200).json(recipe_id);
      }

      return notAuthorized(res, "User not authorized");
    } catch (err) {
      serverError(res, err);
    }
  }

  async deleteRecipe(req, res) {
    try {
      const user = await userModel.findUserByID(req.user.id);
      const recipe = await model.getRecipeByID(req.params.id);

      if (!recipe) {
        return notFound(res, "Recipe does not exist");
      }

      if (user) {
        await stepModel.removeStep(recipe.id);

        await ingredientModel.removeIngredient(recipe.id);

        const data = await model.deleteRecipe(recipe.id);

        return res.send(data);
      }
      return notAuthorized(res, "User not authorized");
    } catch (err) {
      serverError(res, err);
    }
  }
}

module.exports = recipesController;
