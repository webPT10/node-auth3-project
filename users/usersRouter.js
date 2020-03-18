const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("./usersModel")
const restrict  = require("../middleware/restrict")

const router = express.Router({
    mergeParams:true
})

router.post("/register", async (req, res) => {
    const { username, password, department } = req.body
    try {
        const hash = bcrypt.hashSync(password, 14)
        const newUser = await Users.add({
            username: username,
            password: hash,
            department: department
        })
        res.status(200).json(newUser)
    } catch {
        res.status(501).json({ message: "Unable to add user." })
    }
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

        const payload = {
            userId: user.id, 
            userRole: "normal", // normally comes from a database
        }
        // generate a new JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET )

        // sends a Set-Cookie header with the value of the token
        res.cookie("token", token)

        res.json({
            message: `Welcome, ${user.username}`,
        })
    } catch(error){
        next(error)
    }
})

router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.getAll({ department }))
    } catch(error){
        next(error)
    }
})

router.get("/logout", restrict(), async (req, res) => {
    res.status(200).json({ message: `Hooray! Successful Logout.`})
})

module.exports = router;