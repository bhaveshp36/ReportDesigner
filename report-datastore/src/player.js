const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define the schema
const PlayerSchema = new mongoose.Schema({
  username: String,
  steamid: String,
  avatar: String,
  reports: Object,
});

// Create the model
const Player = mongoose.model("Player", PlayerSchema);

// Define the controller methods
const getAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
};

const createPlayer = async (req, res) => {
  const newPlayer = new Player(req.body);
  const player = await newPlayer.save();
  res.status(201).json(player);
};

const getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.status(200).json(player);
};

const updatePlayer = async (req, res) => {
  const updatedPlayer = await Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedPlayer);
};

const deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.status(204).json();
};

// Define the routes
router.get("/players", getAllPlayers);
router.post("/players", createPlayer);
router.get("/players/:id", getPlayer);
router.put("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

// Export the router
module.exports = router;
