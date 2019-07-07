const baseModel = require("./baseModel");
const bcrypt = require("bcrypt");
const gravtar = require("gravatar");
const uuid = require("uuid");

class User extends baseModel {
  constructor() {
    super();
  }

  // Get ALL Users
  async getAll() {
    const users_query = "SELECT id, name, email, avatar FROM users";

    return new Promise((resolve, reject) => {
      this.sql.query(users_query, (err, json_data) => {
        if (err) reject(err);
        else {
          const data = JSON.stringify(json_data);
          const users = JSON.parse(data);
          resolve(users);
        }
      });
    });
  }

  // Check User By Email
  async checkUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      this.sql.query(query, email, (err, users) => {
        if (err) reject(err);
        else {
          const isMatch = users.find(user => user.email === email);
          resolve(isMatch);
        }
      });
    });
  }

  // Find User By ID
  async findUserByID(id) {
    const query = "SELECT id, name, email FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
      this.sql.query(query, id, (err, users) => {
        if (err) reject(err);
        else {
          const isMatch = users.find(user => user.id === id);
          resolve(isMatch);
        }
      });
    });
  }

  // Register Users
  async register(name, email, password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) reject(err);
        else {
          const password = hashedPassword;

          // Create Avatar
          const avatar = gravtar.url(email, {
            s: "200",
            r: "pg",
            d: "404"
          });

          // Generate Unqiue Ids
          const id = uuid.v4();

          this.sql.query(
            "INSERT INTO users set ?",
            {
              id,
              name,
              email,
              avatar,
              password
            },
            (err, data) => {
              if (err) throw err;
              else {
                resolve(id);
              }
            }
          );
        }
      });
    });
  }

  // Sign In Users
  async signIn(email, password) {
    const query = "SELECT * FROM users WHERE email = ?";
    return new Promise((resolve, reject) => {
      this.sql.query(query, email, (err, data) => {
        if (err) reject(err);
        else {
          data.forEach(item => {
            bcrypt.compare(password, item.password, (err, res) => {
              if (res) {
                resolve(item);
              } else {
                reject(err);
              }
            });
          });
        }
      });
    });
  }
}

module.exports = User;
