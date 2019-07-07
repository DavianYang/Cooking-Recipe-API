const baseModel = require("./baseModel");
const uuid = require("uuid");

class Recipes extends baseModel {
  constructor() {
    super();
  }

  async getAllRecipes() {
    const recipes_query = "SELECT * FROM recipes";

    return new Promise((resolve, reject) => {
      this.sql.query(recipes_query, (err, json_data) => {
        if (err) reject(err);
        else {
          const data = JSON.stringify(json_data);
          const recipes = JSON.parse(data);
          resolve(recipes);
        }
      });
    });
  }

  async getRecipeByID(id) {
    const query = "SELECT * FROM recipes WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.sql.query(query, id, (err, recipes) => {
        if (err) reject(err);
        else {
          const isMatch = recipes.find(recipe => recipe.id === id);
          resolve(isMatch);
        }
      });
    });
  }

  async getRecipeByLatest() {
    const query = "SELECT * FROM recipes ORDER BY DATE(date) DESC";
    return new Promise((resolve, reject) => {
      this.sql.query(query, (err, recipes) => {
        if (err) reject(err);
        else {
          resolve(recipes);
        }
      });
    });
  }

  async postRecipes(user_id, category_id, name, estimated_time) {
    return new Promise((resolve, reject) => {
      // Generate Unqiue Ids
      const id = uuid.v4();

      const date = new Date();

      this.sql.query(
        "INSERT INTO recipes set ?",
        {
          id,
          user_id,
          category_id,
          name,
          estimated_time,
          date
        },
        (err, data) => {
          if (err) reject(err);
          else {
            resolve(id);
          }
        }
      );
    });
  }

  async insertLikeIDToRecipe(recipe_id, like_id) {
    return new Promise((resolve, reject) => {
      this.sql.query(
        `UPDATE recipes SET like_id = ? WHERE id = ?`,
        [like_id, recipe_id],
        (err, data) => {
          if (err) reject(err);
          else {
            resolve(data);
          }
        }
      );
    });
  }

  async deleteRecipe(id) {
    const query = "Delete FROM recipes WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.sql.query(query, id, (err, recipe) => {
        if (err) reject(err);
        else {
          resolve(recipe);
        }
      });
    });
  }
}

module.exports = Recipes;
