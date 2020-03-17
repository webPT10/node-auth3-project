const bcrypt = require("bcryptjs");
const Users = require("../users/usersModel");

function restrict() {
  const authError = {
    message: "Yo! Invalid Credentials"
  };
  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;
      if (!username || !password) {
        return res.status(401).json(authError);
      }

      const user = await Users.findBy({ username }).first();
      if (!user) {
        return res.status(401).json(authError);
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        return res.status(401).json(authError);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = restrict;
