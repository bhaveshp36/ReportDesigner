const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  username: String,
  steamid: String,
  avatar: String,
  reports: Object,
});

module.exports = mongoose.model("Player", PlayerSchema);
