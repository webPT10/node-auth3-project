const bcrypt = require("bcryptjs")
const Users = require("../users/usersModel")

function restrict(){

    return async (req, res, next) => {
        try {

        } catch(error){
            next(error)
        }
    }
}
module.exports = {
    restrict
  };