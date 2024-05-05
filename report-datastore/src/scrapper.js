const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

router.post("/scrape", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const pageHtml = $("html").html();

    res.json({ pageHtml });
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape the page" });
  }
});

module.exports = router;
