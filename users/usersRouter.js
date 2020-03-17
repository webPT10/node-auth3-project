const express = require("express")
const bcrypt = require("bcryptjs")

const Users = require("./userModel")
const { restrict } = require("../middleware/restrict")

const router = express.Router({
    mergeParams:true
})

module.exports = router;