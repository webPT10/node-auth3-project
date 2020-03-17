const express = require("express")
const bcrypt = require("bcryptjs")

const Users = require("./userModel")
const { restrict } = require("../middleware/restrict")

JWT
// const jwt = require("jsonwebtoken")

const router = express.Router({
    mergeParams:true
})

router.post("/register", async (req, res) => {

})

router.post("/login", (req, res) => {

})

router.get("/users", restrict, async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(error){
        next(error)
    }
})

router.get("/logout", restrict, async (req, res) => {
    res.status(200).json({ message: `Hooray! Successful Logout.`})
})

module.exports = router;