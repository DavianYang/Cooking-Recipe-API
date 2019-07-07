const baseModel = require("./baseModel");
const uuid = require("uuid");

class Step extends baseModel {
  constructor() {
    super();
  }

  async getAllStep() {
    const steps_query = "SELECT * FROM steps";

    return new Promise((resolve, reject) => {
      this.sql.query(steps_query, (err, steps) => {
        if (err) reject(err);
        else {
          resolve(steps);
        }
      });
    });
  }

  async insertStep(recipes_id, step_order, description) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();

      this.sql.query(
        "INSERT INTO steps set ?",
        { id, recipes_id, step_order, description },
        (err, data) => {
          if (err) reject(err);
          else {
            resolve(id);
          }
        }
      );
    });
  }

  async removeStep(recipes_id) {
    const query = "Delete FROM steps WHERE recipes_id = ?";
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

module.exports = Step;
