const Player = require("./player");


exports.getAllPlayers = async (req, res) => {
  const players = await Player.find();
  res.status(200).json(players);
};

exports.createPlayer = async (req, res) => {
  const newPlayer = new Player(req.body);
  const player = await newPlayer.save();
  res.status(201).json(player);
};

exports.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.status(200).json(player);
};
exports.updatePlayer = async (req, res) => {
  const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(200).json(updatedPlayer);
};

exports.deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.status(204).json();
};

