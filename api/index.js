const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const routes = require("./src/routes/v1/index");
const { ErrorHandler } = require("./src/utils");
const { connectDb } = require("./src/config");
config();

const { createServer } = require("http");
const setupSocketHandlers = require("./socketHandlers");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDb();

app.use("/api/v1", routes);
app.use(ErrorHandler);

//Socket IO mounting on http server
const server = createServer(app);
setupSocketHandlers(server);

// !GLOBAL ERROR HANDLER

server.listen(process.env.PORT, () => {
  console.log("server running on " + process.env.PORT);
});
