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

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "Yo! Invalid Credentials"
      };

    try {
        const { username, password } = req.body

        const user = await Users.findBy({ username }).first()
        if(!user){
            return res.status(401).json({authError})
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid){
            return res.status(401).json(authError)
        }

        res.json({
            message: `Welcome, ${user.username}`
        })
    } catch(error){
        next(error)
    }
})

router.get("/users", restrict, async (req, res, next) => {
    try {
        res.json(await Users.getAll())
    } catch(error){
        next(error)
    }
})

router.get("/logout", restrict, async (req, res) => {
    res.status(200).json({ message: `Hooray! Successful Logout.`})
})

module.exports = router;