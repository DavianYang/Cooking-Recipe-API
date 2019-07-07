const baseModel = require("./baseModel");
const uuid = require("uuid");

class Ingredient extends baseModel {
  constructor() {
    super();
  }

  async insertIngredient(recipes_id, number, name) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();

      this.sql.query(
        "INSERT INTO ingredients set ?",
        { id, recipes_id, name, number },
        (err, data) => {
          if (err) reject(err);
          else {
            resolve(id);
          }
        }
      );
    });
  }

  async removeIngredient(recipes_id) {
    const query = "Delete FROM ingredients WHERE recipes_id = ?";
    return new Promise((resolve, reject) => {
      this.sql.query(query, recipes_id, (err, data) => {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Ingredient;
