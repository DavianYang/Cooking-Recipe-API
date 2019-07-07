const sql = require("../utilites/mysql");

class baseModel {
  constructor() {
    this.sql = sql;
  }
}

module.exports = baseModel;
