const express = require("express");
const playerController = require("./playerController");

const router = express.Router();
router.get("/players", playerController.getAllPlayers);
router.post("/players", playerController.createPlayer);
router.get("/players/:id", playerController.getPlayer);
router.put("/players/:id", playerController.updatePlayer);
router.delete("/players/:id", playerController.deletePlayer);

module.exports = router;
