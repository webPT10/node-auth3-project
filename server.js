const express = require("express")
const session = require("express-session")

const welcomeRouter = require("./welcome/welcomeRouter")
const server = express()

server.use("/", welcomeRouter)

const port = process.env.PORT || 4000

server.use(express.json())
server.use(
    session({
        
    })
)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Server galloping at http://localhost:${port}`)
})