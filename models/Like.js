const baseModel = require("./baseModel");
const uuid = require("uuid");

class Likes extends baseModel {
  constructor() {
    super();
  }

  async getAllLike() {
    const likes_query = "SELECT * FROM likes";

    return new Promise((resolve, reject) => {
      this.sql.query(likes_query, (err, json_data) => {
        if (err) reject(err);
        else {
          const data = JSON.stringify(json_data);
          const likes = JSON.parse(data);
          resolve(likes);
        }
      });
    });
  }

  async isLike(user_id, recipe_id) {
    return new Promise((resolve, reject) => {
      this.sql.query(
        "SELECT * FROM likes WHERE user_id = ? AND recipes_id = ?",
        [user_id, recipe_id],
        (err, data) => {
          if (err) reject(err);
          else {
            resolve(data);
          }
        }
      );
    });
  }

  async getLikeGroupByRecipesID() {
    const query =
      "SELECT recipes_id, count(recipes_id) FROM likes GROUP BY recipes_id";
    return new Promise((resolve, reject) => {
      this.sql.query(query, (err, data) => {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }

  async addLike(user_id, recipes_id) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();

      this.sql.query(
        "INSERT INTO likes set ?",
        {
          id,
          user_id,
          recipes_id
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

  async removeLike(id) {
    const query = "Delete FROM likes WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.sql.query(query, id, (err, like) => {
        if (err) reject(err);
        else {
          resolve(like);
        }
      });
    });
  }
}

module.exports = Likes;
