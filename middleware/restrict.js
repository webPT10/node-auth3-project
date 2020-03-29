// const bcrypt = require("bcryptjs");
// const Users = require("../users/usersModel");
const jwt = require("jsonwebtoken");

function restrict() {
  const authError = {
    message: "Yo! Invalid Credentials"
  };

  return async (req, res, next) => {
    try {
        // the JWT is being sent automatically from the cookie jar,
		// so this uses the cookie-parser middleware to get the value.
      const { token } = req.cookies;

      if (!token) {
        return res.status(401).json(authError);
      }
    //   token = token.split(" ")[1]
    //   console.log(token)

      // verify the token's signature
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).json(authError);
        }

        req.token = decoded;
        console.log(decoded);

        next();
      });
    } catch (error) {
      next(error);
    }
  };
}
module.exports = restrict;
