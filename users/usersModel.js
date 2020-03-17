const db = require("../data/config")


function getAll(){
    return db("users")
        .select("id", "username", "department")
}

function findBy(filter){
    return db("users")
    .where(filter)
    .select("id", "username", "password", "department")
    .first();
}

function add(user){
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids
            return findBy({ id })
        })
}

module.exports = {
    getAll,
    findBy,
    add
}