// const db = require("../data/config")

// function getAll(){
//     return db("users")
//         .select("id", "username", "department")
// }

// function findBy(filter){
//     return db("users")
//     .where(filter)
//     .select("id", "username", "password", "department")
//     .first();
// }

// function add(user){
//     return db("users")
//         .insert(user, "id")
//         .then(ids => {
//             const [id] = ids
//             return findBy({ id })
//         })
// }

// module.exports = {
//     getAll,
//     findBy,
//     add
// }
const bcrypt = require("bcryptjs");
const db = require("../data/config");

function find() {
  return db("users").select("id", "username");
}
function findBy(filter) {
  return db("users")
    .where(filter)
    .select("id", "username", "password");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username");
}
module.exports = {
  add,
  find,
  findBy,
  findById
};
