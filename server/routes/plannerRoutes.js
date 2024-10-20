const express = require('express');
const router = express.Router();
const Planner = require('../models/planner');

// Create a new planner item
router.post('/', async (req, res) => {
  const plannerItem = new Planner(req.body);
  try {
    const savedPlannerItem = await plannerItem.save();
    res.json(savedPlannerItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all planner items
router.get('/', async (req, res) => {
  try {
    const plannerItems = await Planner.find();
    res.json(plannerItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a planner item
router.delete('/:id', async (req, res) => {
  try {
    const plannerItem = await Planner.findById(req.params.id);
    if (!plannerItem) {
      return res.status(404).json({ message: 'Planner item not found' });
    }
    await plannerItem.remove();
    res.json({ message: 'Planner item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
