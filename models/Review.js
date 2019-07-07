const baseModel = require("./baseModel");
const uuid = require("uuid");

class Reviews extends baseModel {
  constructor() {
    super();
  }

  async getAllReviews() {
    const reviews_query = "SELECT * FROM reviews";

    return new Promise((resolve, reject) => {
      this.sql.query(reviews_query, (err, json_data) => {
        if (err) reject(err);
        else {
          const data = JSON.stringify(json_data);
          const reviews = JSON.parse(data);
          resolve(reviews);
        }
      });
    });
  }

  async addReview(user_id, recipes_id, text, stars) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();

      this.sql.query(
        "INSERT INTO reviews set ?",
        {
          id,
          user_id,
          recipes_id,
          text,
          stars
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

  async removeReview(id) {
    const query = "Delete FROM reviews WHERE id = ?";

    return new Promise((resolve, reject) => {
      this.sql.query(query, id, (err, review) => {
        if (err) reject(err);
        else {
          resolve(review);
        }
      });
    });
  }
}

module.exports = Reviews;
