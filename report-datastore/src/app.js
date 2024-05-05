const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

//For body Parsing//
app.use(express.json());

const playerRoutes = require("./playerRoutes");
app.use(playerRoutes);

// Import Swagger route
const swaggerRoute = require("./swagger");
app.use("/docs", swaggerRoute);

const scrapeRoutes = require("./scrapper");
app.use(scrapeRoutes);

// Default Route //
app.get("/", (req, res) => {
  res.send(
    "Server is running on port 8000. Please visit /docs for API documentation."
  );
});

module.exports = app;
