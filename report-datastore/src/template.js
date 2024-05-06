const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Define the schema
const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  objects: { type: Array, required: true },
});

// Create the model
const Template = mongoose.model("Template", TemplateSchema);

// Define the controller methods
const getAllTemplates = async (req, res) => {
  const templates = await Template.find();
  res.status(200).json(templates);
};

const createTemplate = async (req, res) => {
  const newTemplate = new Template(req.body);
  const template = await newTemplate.save();
  res.status(201).json(template);
};

const getTemplate = async (req, res) => {
  const template = await Template.findById(req.params.id);
  res.status(200).json(template);
};

const updateTemplate = async (req, res) => {
  const updatedTemplate = await Template.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedTemplate);
};

const deleteTemplate = async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.status(204).json();
};

// Define the routes
router.get("/templates", getAllTemplates);
router.post("/templates", createTemplate);
router.get("/templates/:id", getTemplate);
router.put("/templates/:id", updateTemplate);
router.delete("/templates/:id", deleteTemplate);

// Export the router
module.exports = router;
