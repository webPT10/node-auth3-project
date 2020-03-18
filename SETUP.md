# STEP UP 

## INSTALLS 1
- npm install
- PACKAGE.JSON > npm init -y 
    >> Scripts, add:
        > "server": "nodemon server.js or index.js"
        > "start": "node server or index"
- EXPRESS > npm i express --save
- KNEX & SQLITE3 > npm i knex sqlite3
- KNEXFILE, create > NPX knex init 
- KNEXFILE, update > 
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/projects.db3'
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: "./data/seeds",
    }
  },
};
       
- NODEMON > npm install --save-dev nodemon
- dotenv > npm i dotenv
    > add to package.json 
        > "server": "nodemon -r dotenv/config server.js",
    
    > create .env file
    > add in > 
        > JWT_SECRET="nsno"
    > pass this into creating a new JWT > 
        > const token = jwt.sign(payload, process.env.JWT_SECRET)

## FILE STRUCTURE
- mkdir data && touch data/config.js
- CONFIG.js, add > 
    > const knex = require("knex")
    const knexfile = require("../knexfile")
    module.exports = knex(knexfile.development)

## FILE STRUCTURE 1 > index or server file
- touch server.js
- server.js > add: 
    const express = require("express")
    const welcomeRouter = require("./welcome/welcomeRouter")
    const server = express()
    const port = process.env.PORT || 4000
    server.use(express.json())
    server.use("/", welcomeRouter)
    server.use((err, req, res, next) => {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong",
        })
    })
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`)
    })

## FILE STRUCTURE 2
- mkdir welcome && touch welcome/welcomeRouter.js
    > welcomeRouter.js > add : 
        const express = require("express")
        const router = express.Router()
        router.get("/", (req, res, next) => {
            res.json({
                message: "Welcome to node-db-challenge",
            })
        })
        module.exports = router

- mkdir >  users
- touch > 
    users/usersRouter.js 
    users/usersModel.js 
    
- npm run server

## DESIGN DATA MODEL via white board

- table > User >> id, name, description\*

## MIGRATIONS

- npx knex migrate:make initial
- npx knex migrate:latest
- npx knex migrate:rollback

## SEEDS

- npx knex seed:make ___
- npx knex seed:run
- npx knex seed:rollback

## User > router & model
- set up basic structure > 
    >> Model : 
        const db = require("../data/config")
        module.exports = {}

    >> Router :
        const express = require("express")
        const Users = require("./userModel")
        const router = express.Router({
        mergeParams:true
        })
        module.exports = router;

## INSTALLS 2
- BCRYPTJS > npm i bcryptjs

## EXPRESS-SESSIONS
https://www.npmjs.com/package/express-session

> npm i express-session
    >> this is just Middleware

> server.js
    - const session = require("express-session")

    -server.use(session({
        name: "token", // overwrites the default cookie name + hides stack better
        resave: false, // avoids recreating sessions that have not changed
        saveUninitialized: false, // laws against setting cookies automatically 
        secret: "trust the Government" // cryptographically sign the cookie
        cookie: {
            httpOnly: true, // disallow javaScript from reading our cookie contents
            maxAge: 15 * 1000, // expires cookie after 15seconds
        }
    }))


> in restrict.js >> 
    - const sessions = { }
    - module.exports = {sessions,restrict};

> 1 import into router 
    - const { sessions, restrict } = require("PATH")

> 2 see restrict.js > line 16-19
    const { authorization } = req.headers
      if(!sessions[authorization]) {
        return res.status(401).json(authError)
      }

> 3 userRouter.js
    const authToken = Math.random();
    sessions[authToken] = user.id;

    res.setHeader("Authorization", authToken);


> #3 above not needed now, can use instead: 
    - req.session.user = user

## COOKIES
- userRouter.js
   > remove: // res.setHeader("Authorization", authToken);
   > update to:  res.setHeader("Set-Cookie", `token=${authToken}; Path=/`);
   > re-places the Authorization with Cookie

- restrict.js
    > remove // const { authorization } = req.headers if(!sessions[authorization]) {return          // res.status(401).json(authError)}
    > update to: 
    const { cookie } = req.headers
      if(!cookie){
        return res.status(401).json(authError)
      }

    const authToken = cookie.replace("token=", "")
      if(!sessions[authToken]){
        return res.status(401).json(authError)
      }
    
    >>> UPDATE to:
        if (!req.session || !req.session.user) {
        return res.status(401).json(authError)
      }

## INSTALL > connect-session-knex
- npm install connect-session-knex
- import to server.js >> 
    const KnexSessionStore = require("connect-session-knex")(session)
- add to server.use(session(store: new KnexSessionStore({
      createTable: true, // if session table doesn't exist, create it automatically
      knex: dbConfig //configured instance of knex
    }))

## INSTALL > dotnev
- npm install dotenv --save-dev
- create dotenv file
    > COOKIE_SECRET="trust the Government"

- update package.json @ 
    > "scripts": {
    "server": "nodemon -r dotenv/config server.js",

- server.js >
    > server.use(
  session({
    secret: process.env.COOKIE_SECRET || "secret", 
    })

## JSON WEB TOKEN
- npm i jsonwebtoken
- create payload > 
    > const payload = {
        userId: user.id, 
        userRole: "normal", // normally comes from a database
    }
- create jwt > 
    > const token = jwt.sign(payload,"nsno" ) // nsno is the secret key

## INSTALL > cookie-parser
- npm i cookie-parser