const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const routes = require("./src/routes/v1/index");
const { ErrorHandler } = require("./src/utils");
const { connectDb } = require("./src/config");

config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDb();

app.use("/api/v1", routes);

// !GLOBAL ERROR HANDLER
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("server running on " + process.env.PORT);
});
