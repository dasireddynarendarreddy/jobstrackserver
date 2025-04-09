const express = require('express');
const router = express.Router();
const Application = require('../models/Application');


// Add
router.post('/', async (req, res) => {
    
  const newApp = new Application(req.body);
  const saved = await newApp.save();
  res.status(201).json(saved);
});

// Get All
router.get('/', async (req, res) => {
  const apps = await Application.find();
  
  res.json(apps);
});

// Update
router.put('/:id', async (req, res) => {
    console.log("update")
  const updated = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
    console.log("delete")
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted'});
});

module.exports = router;
