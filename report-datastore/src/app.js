const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

//For body Parsing//
app.use(express.json());

const playerRoutes = require("./player");
app.use(playerRoutes);

const templateRouter = require("./template"); // adjust the path according to your project structure
app.use(templateRouter);

// Import Swagger route
const swaggerRoute = require("./swagger");
app.use("/docs", swaggerRoute);

// Default Route //
app.get("/", (req, res) => {
  res.send(
    "Server is running on port 8000. Please visit /docs for API documentation."
  );
});

module.exports = app;
