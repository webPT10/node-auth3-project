const express = require("express");
const welcomeRouter = require("./welcome/welcomeRouter");
const usersRouter = require("./users/usersRouter");
const server = express();
const cookieParser = require("cookie-parser")

const port = process.env.PORT || 4000;
server.use(express.json());
server.use(cookieParser())

server.use("/", welcomeRouter);
server.use("/api", usersRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong"
  });
});
server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
