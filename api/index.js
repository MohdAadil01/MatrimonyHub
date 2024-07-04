const express = require("express");
const routes = require("./src/routes/v1/index");
const app = express();

app.use("/api/v1", routes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
