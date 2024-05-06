const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const axios = require("axios");

// Fetch OpenAPI spec from URL
axios
  .get("https://api.opendota.com/api")
  .then((response) => {
    const swaggerDocument = response.data;

    // Setup Swagger UI
    router.use("/", swaggerUi.serve);
    router.get("/", swaggerUi.setup(swaggerDocument));
  })
  .catch((error) => {
    console.error("Error fetching OpenAPI spec:", error);
  });

module.exports = router;
