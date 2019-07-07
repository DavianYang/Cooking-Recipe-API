const userModel = require("../models/User");
const model = new userModel();
const jwt = require("jsonwebtoken");
const config = require("config");
const { serverError, badRequest } = require("../utilites/httpError");

class userController {
  async getAll(req, res) {
    try {
      const users = await model.getAll();

      return res.status(200).send(users);
    } catch (err) {
      serverError(err);
    }
  }

  async findUserByID(req, res) {
    try {
      const user = await model.findUserByID(req.params.id);

      if (user) {
        res.json(user);
      }

      return badRequest(res, "User Not Found");
    } catch (err) {
      serverError(res, err);
    }
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await model.checkUserByEmail(email);

      // Check if existing User
      if (user) {
        return badRequest(res, "User already exist");
      }

      // Register User
      const user_id = await model.register(name, email, password);

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user_id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token
          });
        }
      );
    } catch (err) {
      serverError(err);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const user = await model.signIn(email, password);

      if (!user) {
        return badRequest(res, "Invalid Credentials");
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token
          });
        }
      );
    } catch (err) {
      serverError(res, err);
    }
  }
}

module.exports = userController;
