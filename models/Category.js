const baseModel = require("./baseModel");

class Category extends baseModel {
  constructor() {
    super();
  }

  async getRecipesByCategory(category_id) {
    const query = `SELECT *
                   FROM recipes
                   LEFT JOIN category
                   ON recipes.category_id = category.id WHERE category.id = ?
                   ORDER BY category.id;`;
    return new Promise((resolve, reject) => {
      this.sql.query(query, category_id, (err, json_data) => {
        const data = JSON.stringify(json_data);
        const recipes = JSON.parse(data);

        resolve(recipes);
      });
    });
  }

  // Get All Recipes With Categories
}

module.exports = Category;
